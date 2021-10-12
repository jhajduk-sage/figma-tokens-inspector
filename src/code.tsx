figma.showUI(__html__, {width: 500, height: 300});

const propertiesMapping = {
  sizing: ['width and height'],
  height: 'height',
  width: 'width',
  spacing: 'padding',
  verticalPadding: 'padding left and right',
  horizontalPadding: 'padding top and bottom',
  itemSpacing: 'padding',
  fill: ['background-color', 'color'],
  border: 'border-color',
  borderRadius: 'border-radius',
  borderRadiusTopLeft: 'border-top-left-radius',
  borderRadiusTopRight: 'border-top-right-radius',
  borderRadiusBottomRight: 'border-bottom-right-radius',
  borderRadiusBottomLeft: 'border-bottom-left-radius',
  borderWidth: 'border-width',
  boxShadow: 'box-shadow',
  opacity: 'opacity',
  fontFamilies: 'font-family',
  fontWeights: 'font-weight',
  fontSizes: 'font-size',
  lineHeights: 'line-height',
  typography: 'font',
  letterSpacing: 'letter-spacing',
  paragraphSpacing: 'text-indent',
  paddingTop: 'padding-top',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  paddingRight: 'padding-right'
};


export function getTokenName(node: BaseNode, property: string) {
  if (!node) return null;
  const output = node.getSharedPluginData('tokens', property);
  return output ? JSON.parse(output) : null;
}

export function mapToCssProperty(node: BaseNode, property: string) {
  if (!node) return null;

  if (node.type === 'TEXT' && property === 'fill') {
    return propertiesMapping[property][1];
  }

  if (property === 'fill') {
    return propertiesMapping[property][0];
  }

  return propertiesMapping[property];
}

export function getAssignedTokens(node: BaseNode) {
  const pluginData = Object.keys(propertiesMapping)
      .map((prop) => [
        mapToCssProperty(node, prop),
        getTokenName(node, prop)
      ])
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
