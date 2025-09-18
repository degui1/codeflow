export function downloadFile(yamlString: string, fileName = 'arquivo.yaml') {
  const blob = new Blob([yamlString], { type: 'text/yaml;charset=utf-8;' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(link.href)
}
