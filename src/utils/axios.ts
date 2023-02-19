import axios from 'axios';

const serviceToken = window.localStorage.getItem('serviceToken');

const axiosServices = axios.create({
	baseURL: process.env.REACT_APP_BASE_API_URL,
	headers: {
		'Authorization': `Bearer ${serviceToken}`,
		'Accept': '*',
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'X-Powered-By': 'Express',
		'Vary':'Origin',
		'Content-Length': '57',
		'ETag': 'W/"39-hSoXpawMxBdbWDSdIEsa1tLUNzc"',
		'Date':'Sat, 18 Feb 2023 10:08:04 GMT',
		'Connection': 'keep-alive',
		'Keep-Alive': 'timeout=5'
	  },
});


axios.defaults.headers.common['Authorization'] = `Bearer ${serviceToken}`;
axios.defaults.headers.post['Content-Type'] = "*/*";
axios.defaults.headers.post['Accept'] = "*/*";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";

axiosServices.interceptors.response.use(response => {
	return response;
}, error => {
	const { pathname } = window.location;
	console.log('error', error);
	
	if (error.response.status === 401 && pathname !== '/login') {
		// localStorage.removeItem("serviceToken");
		window.location.href = "/login";		
	}
	return error.response;
});

export default axiosServices;