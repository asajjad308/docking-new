
export const getPropertyData = async (url: string, type: string) => {
  const response = await fetch(url)
  const data = await response.json()
  const propCat = data.filter((prop: any) => prop.category === type)
  return propCat;
}

export const getLocations = async () => {
  const response = await fetch("https://dockingapi20230918192206.azurewebsites.net/api/Products");
  const data = await response.json();
  return data.map((loc: any) => loc.location)
}
