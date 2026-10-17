import { Document, Page } from '@react-pdf/renderer';
import { Header, FilterChips, Summary, Table, Footer, styles, formatDate, formatCurrency, formatName, paymentLabel } from './layout';

const frequencyLabel = (frequency) => (frequency === 0 ? 'Semestral' : 'Anual');

const COLUMNS = [
  { label: 'Fecha', flex: 1.3, render: (i) => formatDate(i.createdAt) },
  { label: 'Nº', flex: 0.6, style: styles.tdMuted, render: (i) => i.memberNumber },
  { label: 'Socio', flex: 3, style: styles.tdStrong, render: (i) => formatName(i.displayName) },
  { label: 'Concepto', flex: 2.6, render: (i) => formatName(i.concept) },
  { label: 'Forma', flex: 1, render: (i) => paymentLabel(i.type) },
  { label: 'Periodo', flex: 1.1, render: (i) => frequencyLabel(i.frequency) },
  { label: 'Importe', flex: 1.3, align: 'right', style: styles.tdStrong, render: (i) => formatCurrency(i.amount) }
];

export const IngresosPDF = ({ ingresos = [], filters = [], summary }) => {
  const filteredByType = filters.some((f) => f === 'Solo banco' || f === 'Solo caja');

  return (
    <Document title="Ingresos · eHuertos" author="Asociación Huertos La Salud – Bellavista">
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header title="Ingresos" />
        <FilterChips filters={filters} />
        <Summary summary={summary} noun="ingresos" showSplit={!filteredByType} />
        <Table columns={COLUMNS} rows={ingresos} emptyText="No hay ingresos con estos filtros." />
        <Footer />
      </Page>
    </Document>
  );
};
