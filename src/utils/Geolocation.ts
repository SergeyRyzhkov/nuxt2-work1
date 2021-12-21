import { AxiosInstance } from "axios";

export const geolocationCoordinates = () => {
  if (!!navigator.geolocation) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      });
    });
  }
  return null;
};

export const getCityByGeolocation = async (api: AxiosInstance) => {
  const latLng: any = await geolocationCoordinates();
  if (!!latLng) {
    const headers = { Authorization: `Token ${"e9131afdaa36cb065382c3333c43e1844fa52a0e"}` };
    const result = await api.get(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address?lat=${latLng[0]}&lon=${latLng[1]}`,
      {
        headers,
      }
    );
    if (!!result?.data?.suggestions && result.data.suggestions.length > 0) {
      return result.data.suggestions[0]?.data?.city;
    }
  }
};
