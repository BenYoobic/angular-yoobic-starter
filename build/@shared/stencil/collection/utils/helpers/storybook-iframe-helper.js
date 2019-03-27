export function StorybookIframeHelper(name, story) {
    return `http://localhost:9009/iframe.html?selectedKind=${name}&selectedStory=${story}`;
}
