
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

export const getSinglePropertyData = async (url: string, id: any) => {
  const response = await fetch(`https://dockingapi20230918192206.azurewebsites.net/api/Products/${id}`);
  const data = await response.json();
  return data;
}
export const updatePropertyAvailability = async (id: any, property: property | undefined) => {
  if (property === undefined) {
    return;
  }
  try {
    const response = await fetch(`https://dockingapi20230918192206.azurewebsites.net/api/Products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...property,
        available: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update property availability. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating property availability:', error);
    throw error;
  }
};

