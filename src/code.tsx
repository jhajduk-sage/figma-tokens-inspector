figma.showUI(__html__, {width: 350, height: 150});

const properties = {
  values: {},
  sizing: {},
  height: {},
  width: {},
  spacing: {},
  verticalPadding: {},
  horizontalPadding: {},
  itemSpacing: {},
  fill: {},
  border: {},
  borderRadius: {},
  borderRadiusTopLeft: {},
  borderRadiusTopRight: {},
  borderRadiusBottomRight: {},
  borderRadiusBottomLeft: {},
  borderWidth: {},
  boxShadow: {},
  opacity: {},
  fontFamilies: {},
  fontWeights: {},
  fontSizes: {},
  lineHeights: {},
  typography: {},
  letterSpacing: {},
  paragraphSpacing: {},
  tokenValue: {},
  tokenName: {},
  description: {},
};

export function getTokenName(node: BaseNode, property: string) {
  if (!node) return null;
  const output = node.getSharedPluginData('tokens', property) || node.getPluginData(property);
  return output ? JSON.parse(output) : null;
}

export function getAssignedTokens(node: BaseNode) {
  const pluginData = Object.keys(properties)
      .map((prop) => [prop, getTokenName(node, prop)])
      .filter(([, value]) => !!value);
  return pluginData.length > 0 ? Object.fromEntries(pluginData) : null;
}

figma.on("selectionchange", () => {
  const selection = figma.currentPage.selection;
  if (selection.length > 1) {
    figma.ui.postMessage(null)
    return;
  }

  const tokens = getAssignedTokens(selection[0])
  figma.ui.postMessage(tokens);
})
