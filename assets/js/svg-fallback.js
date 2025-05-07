/**
 * SVG Fallback Script
 * This script checks if SVG images are loading properly and provides fallback options
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if an image has loaded properly
    function checkImageLoaded(img) {
        return img.complete && img.naturalHeight !== 0;
    }
    
    // Get all SVG images in the AI models section
    const svgImages = document.querySelectorAll('.service-icon img.ai-logo');
    
    // Process each SVG image
    svgImages.forEach(function(img) {
        // Check if the image loaded properly
        if (!checkImageLoaded(img)) {
            console.log('SVG failed to load: ' + img.src);
            
            // Create a colored div as fallback
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'svg-fallback';
            fallbackDiv.textContent = img.alt.replace(' Logo', '');
            
            // Replace the img with the fallback div
            img.parentNode.replaceChild(fallbackDiv, img);
        }
    });
    
    // Add inline SVG for common logos
    const logoMap = {
        'OpenAI Logo': '<svg fill="#10a37f" height="100%" width="100%" viewBox="0 0 24 24"><path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"></path></svg>',
        'Claude Logo': '<svg fill="#000000" height="100%" width="100%" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>',
        'Gemini Logo': '<svg fill="#8e44ad" height="100%" width="100%" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8h-4V8h4v2zm5 2h-2v6h2v-6zm-1-4h-4V6h4v2z"></path></svg>'
    };
    
    // Apply inline SVGs where possible
    document.querySelectorAll('.service-icon img.ai-logo').forEach(function(img) {
        const altText = img.alt;
        if (logoMap[altText]) {
            const svgContainer = document.createElement('div');
            svgContainer.className = 'inline-svg-container';
            svgContainer.innerHTML = logoMap[altText];
            img.parentNode.replaceChild(svgContainer, img);
        }
    });
});
