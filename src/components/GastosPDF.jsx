import { Document, Page } from '@react-pdf/renderer';
import { Header, FilterChips, Summary, Table, Footer, styles, formatDate, formatCurrency, formatName, paymentLabel, COLORS } from './layout';

const COLUMNS = [
  { label: 'Fecha', flex: 1.3, render: (g) => formatDate(g.createdAt) },
  { label: 'Concepto', flex: 3.4, style: styles.tdStrong, render: (g) => formatName(g.concept) },
  { label: 'Proveedor', flex: 2.6, render: (g) => g.supplier || '—' },
  { label: 'Factura', flex: 1.6, style: styles.tdMuted, render: (g) => g.invoice || '—' },
  { label: 'Forma', flex: 1, render: (g) => paymentLabel(g.type) },
  { label: 'Importe', flex: 1.4, align: 'right', style: [styles.tdStrong, { color: COLORS.danger }], render: (g) => `−${formatCurrency(g.amount)}` }
];

export const GastosPDF = ({ gastos = [], filters = [], summary }) => {
  const filteredByType = filters.some((f) => f.startsWith('Solo '));

  return (
    <Document title="Gastos · eHuertos" author="Asociación Huertos La Salud – Bellavista">
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header title="Gastos" />
        <FilterChips filters={filters} />
        <Summary summary={summary} noun="gastos" showSplit={!filteredByType} negative />
        <Table columns={COLUMNS} rows={gastos} emptyText="No hay gastos con estos filtros." />
        <Footer />
      </Page>
    </Document>
  );
};
