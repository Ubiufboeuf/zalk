export function preprocess (operation: string): string {
  return operation
    .replace(/[·⋅∙×∗]/g, '*')
    .replace(/÷/g, '/')
    .replace(/(\d)(\()/g, '$1*$2')
    .replace(/(\))(\d)/g, '$1*$2')
    .replace(/(\))(\()/g, '$1*$2')
}
