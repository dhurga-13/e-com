const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            if (content.includes('<button') && !content.includes('<button suppressHydrationWarning')) {
                content = content.replace(/<button(?=\s|>)/g, '<button suppressHydrationWarning');
                modified = true;
            }
            if (content.includes('<input') && !content.includes('<input suppressHydrationWarning')) {
                content = content.replace(/<input(?=\s|>)/g, '<input suppressHydrationWarning');
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDir('./components');
