export const BASE_URL = 'http://localhost:8000/api/developers/'

export const DEVELOPERS_URL = (DEV_ID = '') => `${BASE_URL}${DEV_ID}`

export const DEVELOPER_EXIST_URL = `${BASE_URL}1/exists`
