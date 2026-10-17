require('@babel/register');
const express = require('express');
const React = require('react');
const { renderToStream } = require('@react-pdf/renderer');
const { SociosPDF } = require('./components/SociosPDF');
const { IngresosPDF } = require('./components/IngresosPDF');
const { GastosPDF } = require('./components/GastosPDF');
const { BalancePDF } = require('./components/BalancePDF');

const app = express();
app.use(express.json());

app.post('/socios', async (req, res) => {
    try {
        const { socios, filters } = req.body;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=socios.pdf');

        const stream = await renderToStream(React.createElement(SociosPDF, { socios, filters }));
        stream.pipe(res);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error interno");
    }
});

app.post('/ingresos', async (req, res) => {
    try {
        const { ingresos, filters, summary } = req.body;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ingresos.pdf');

        const stream = await renderToStream(React.createElement(IngresosPDF, { ingresos, filters, summary }));
        stream.pipe(res);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error interno");
    }
});

app.post('/gastos', async (req, res) => {
    try {
        const { gastos, filters, summary } = req.body;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=gastos.pdf');

        const stream = await renderToStream(React.createElement(GastosPDF, { gastos, filters, summary }));
        stream.pipe(res);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error interno");
    }
});

app.post('/balance', async (req, res) => {
    try {
        const { balance, year } = req.body;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=balance.pdf');

        const stream = await renderToStream(React.createElement(BalancePDF, { balance, year }));
        stream.pipe(res);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error interno");
    }
});

const PORT = 10001;
app.listen(PORT, () => console.log(`Huertos PDF running on port ${PORT}`));