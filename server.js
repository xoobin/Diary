const express = require('express');
const path = require('path');

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

app.use('/admin.html', (req, res, next) => { res.set('X-Robots-Tag', 'noindex'); next(); });
app.use(express.static(path.join(__dirname, 'public')));

app.all('/api/comment', require('./api/comment'));
app.all('/api/survey', require('./api/survey'));
app.all('/api/admin', require('./api/admin'));
app.get('/healthz', (req, res) => res.send('ok'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
