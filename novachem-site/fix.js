const fs = require('fs');
let content = fs.readFileSync('catalogue.html', 'utf8');

// Find the conflict block
const headStart = content.indexOf('<<<<<<< HEAD');
const conflictEnd = content.indexOf('>>>>>>> 7b40700359187c69467a24f058e761687bc0bc1c');

if (headStart > -1 && conflictEnd > -1) {
    const headBlock = content.substring(headStart, conflictEnd + 45);
    
    // Extract the descriptions for the 8 products from the head block
    const skus = ['NC-CLN-001', 'NC-IND-004', 'NC-SPC-006', 'NC-SPC-011', 'NC-IND-015', 'NC-SPC-016', 'NC-IND-017', 'NC-CLN-019'];
    const updates = {};
    
    skus.forEach(sku => {
        // Regex to find the article with this SKU in headBlock
        const skuIdx = headBlock.indexOf(sku);
        if (skuIdx > -1) {
            // Find the preceding <article> tag
            const articleStart = headBlock.lastIndexOf('<article', skuIdx);
            const articleEnd = headBlock.indexOf('</article>', skuIdx);
            const articleBlock = headBlock.substring(articleStart, articleEnd);
            
            // Extract data-full-desc
            const descMatch = articleBlock.match(/data-full-desc="([^"]+)"/);
            // Extract short desc
            const shortDescMatch = articleBlock.match(/<p class="product-desc">([^<]+)<\/p>/);
            
            if (descMatch) {
                updates[sku] = {
                    fullDesc: descMatch[1],
                    shortDesc: shortDescMatch ? shortDescMatch[1] : null
                };
            }
        }
    });

    // Remove the conflict block
    content = content.substring(0, headStart) + content.substring(conflictEnd + 45);

    // Apply updates to the remaining content
    for (const [sku, data] of Object.entries(updates)) {
        const skuIdx = content.indexOf(sku);
        if (skuIdx > -1) {
            const articleStart = content.lastIndexOf('<article', skuIdx);
            const articleEnd = content.indexOf('</article>', skuIdx);
            let articleBlock = content.substring(articleStart, articleEnd);
            
            // Replace data-full-desc
            articleBlock = articleBlock.replace(/data-full-desc="[^"]+"/, 'data-full-desc="' + data.fullDesc + '"');
            
            // Replace short desc
            if (data.shortDesc) {
                articleBlock = articleBlock.replace(/<p class="product-desc">[^<]+<\/p>/, '<p class="product-desc">' + data.shortDesc + '</p>');
            }
            
            content = content.substring(0, articleStart) + articleBlock + content.substring(articleEnd);
        }
    }
}

// Change <p class="modal-full-desc" id="modalFullDesc"></p> to <div class="modal-full-desc" id="modalFullDesc"></div>
content = content.replace(/<p class="modal-full-desc" id="modalFullDesc"><\/p>/g, '<div class="modal-full-desc" id="modalFullDesc"></div>');
content = content.replace(/<p class="modal-full-desc" id="modalFullDesc">\s*<\/p>/g, '<div class="modal-full-desc" id="modalFullDesc"></div>');

fs.writeFileSync('catalogue.html', content);
console.log('Successfully fixed conflict and updated descriptions!');
