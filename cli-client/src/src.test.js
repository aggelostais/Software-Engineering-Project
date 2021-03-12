const fs = require('fs');
const {createOptionsPoint } = require('./SessionsPerPoint_c.js')
const {createOptionsProvider } = require('./SessionsPerProvider_c.js')
const {createOptionsStation } = require('./SessionsPerStation_c.js')
/*
//save old token
const path = "./softeng20bAPI.token";
const already_logged_in =fs.existsSync(path)
if(already_logged_in) {
    const old_token = fs.readFileSync(path);
    //console.log(JSON.parse(old_token))
}
*/
//Create fake login for Unit tests
fake_token ='{"token":"123456789"}'
fs.writeFileSync('./softeng20bAPI.token', fake_token);
// unit tests
//SessionsPerPoint_c
test('options for SessionsPerPoint GET request', ()=>{
    const pointid = '1-1'
    const from = '20211742'
    const to = '20214217'
    const format = 'json'
    const options = createOptionsPoint(pointid, from, to, format)
    expected_options = {
        hostname: 'localhost',
        port: 8765,
        path: "/evcharge/api/SessionsPerPoint/1-1/20211742/20214217?format=json",
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'X-OBSERVATORY-AUTH': "123456789"
        }
    }
    expect(options).toEqual(expected_options)
})

//SessionsPerProvider_c
test('options for SessionsPerProvider GET request', ()=>{
    const providerid = '1'
    const from = '20211742'
    const to = '20214217'
    const format = 'json'
    const options = createOptionsProvider(providerid, from, to, format)
    expected_options = {
        hostname: 'localhost',
        port: 8765,
        path: "/evcharge/api/SessionsPerProvider/1/20211742/20214217?format=json",
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'X-OBSERVATORY-AUTH': "123456789"
        }
    }
    expect(options).toEqual(expected_options)
})

//SessionsPerStation_c
test('options for SessionsPerStation GET request', ()=>{
    const stationid = '1'
    const from = '20211742'
    const to = '20214217'
    const format = 'json'
    const options = createOptionsStation(stationid, from, to, format)
    expected_options = {
        hostname: 'localhost',
        port: 8765,
        path: "/evcharge/api/SessionsPerStation/1/20211742/20214217?format=json",
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'X-OBSERVATORY-AUTH': "123456789"
        }
    }
    expect(options).toEqual(expected_options)
})

/*
//replace fake_token
if(already_logged_in) {
    fs.writeFileSync('./softeng20bAPI.token', old_token);
}
*/