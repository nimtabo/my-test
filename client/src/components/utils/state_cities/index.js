import data from './US_States_and_Cities.json'

export const getStates = () => {
  return Object.keys(data)
}

export const getCities = (state) => {
  for (const [key, value] of Object.entries(data)) {
    if (key === state) return value.slice(1)
  }
}

export const getStateAbriv = (state) => {
  for (const [key, value] of Object.entries(data)) {
    if (key === state) return value[0]
  }
}

export const getCityState = (city) => {
  for (const [key, value] of Object.entries(data)) {
    if (Object.values(value).includes(city)) return key
  }
}