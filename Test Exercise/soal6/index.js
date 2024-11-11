import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3001;
const app = express();

app.use(express.static('public'));

app.get('/range-suhu-setahun', (req, res) => {
    fs.readFile('./archive.json', (err, data) => {
        if (err) console.log('Failed to obtain data');
        else {
            const archive = JSON.parse(data);
            
            let maxi = -99999;
            let maxIndex = 0;
            for (let i = 0; i < archive.daily.temperature_2m_max.length; i++) {
                if (archive.daily.temperature_2m_max[i] > maxi) {
                    maxi = archive.daily.temperature_2m_max[i];
                    maxIndex = i;
                }
            }

            let mini = 99999;
            let minIndex = 0;
            for (let i = 0; i < archive.daily.temperature_2m_min.length; i++) {
                if (archive.daily.temperature_2m_min[i] < mini) {
                    mini = archive.daily.temperature_2m_min[i];
                    minIndex = i;
                }
            }

            let dt = {
                "tgl_min" : archive.daily.time[minIndex],
                "min": mini,
                "tgl_max": archive.daily.time[maxIndex],
                "max": maxi
            }

            res.send(dt);
            res.end();
        }
    })
})

app.get('/suhu-melebihi/:suhu', (req, res) => {
    const suhu = req.params.suhu;
    fs.readFile('./archive.json', (err, data) => {
        if (err) console.log('Failed to obtain data');
        else {
            const archive = JSON.parse(data);
            
            let dt = {
                "total" : 0,
                "tgl": []
            }

            for (let i = 0; i < archive.daily.temperature_2m_max.length; i++) {
                if (archive.daily.temperature_2m_max[i] > suhu) {
                    dt.total++;
                    dt.tgl.push(
                        {
                            "suhu": archive.daily.temperature_2m_max[i],
                            "tgl": archive.daily.time[i]
                        }
                    );
                }
            }

            res.send(dt);
            res.end();
        }
    })
})

app.get('/suhu-dibawah/:suhu', (req, res) => {
    const suhu = req.params.suhu;
    fs.readFile('./archive.json', (err, data) => {
        if (err) console.log('Failed to obtain data');
        else {
            const archive = JSON.parse(data);
            
            let dt = {
                "total" : 0,
                "tgl": []
            }

            for (let i = 0; i < archive.daily.temperature_2m_min.length; i++) {
                if (archive.daily.temperature_2m_min[i] < suhu) {
                    dt.total++;
                    dt.tgl.push(
                        {
                            "suhu": archive.daily.temperature_2m_min[i],
                            "tgl": archive.daily.time[i]
                        }
                    );
                }
            }

            res.send(dt);
            res.end();
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})