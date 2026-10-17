import { Document, Page, Text, View } from '@react-pdf/renderer';
import { Header, FilterChips, Table, Footer, styles, formatDate, formatName } from './layout';

const TYPE_LABELS = {
  0: 'Lista de espera',
  1: 'Hortelano',
  2: 'Hortelano + invern.',
  3: 'Colaborador',
  4: 'Subvención',
  5: 'Informático'
};

const COLUMNS = [
  { label: 'Nº', flex: 0.55, style: styles.tdStrong, render: (s) => s?.metadata?.memberNumber },
  { label: 'Huerto', flex: 0.75, render: (s) => (s?.metadata?.plotNumber > 0 ? s.metadata.plotNumber : '—') },
  { label: 'Nombre', flex: 3, style: styles.tdStrong, render: (s) => formatName(s?.user?.displayName) },
  { label: 'DNI', flex: 1.3, render: (s) => s?.metadata?.dni || '—' },
  { label: 'Teléfono', flex: 1.3, render: (s) => s?.metadata?.phone || '—' },
  { label: 'Correo', flex: 3, style: styles.tdMuted, render: (s) => s?.account?.email || '—' },
  { label: 'Alta', flex: 1.2, render: (s) => formatDate(s?.metadata?.createdAt) },
  { label: 'Tipo', flex: 1.7, render: (s) => TYPE_LABELS[s?.metadata?.type] ?? '—' },
  { label: 'Estado', flex: 1, render: (s) => (s?.account?.status === 1 ? 'Activo' : 'Inactivo') }
];

export const SociosPDF = ({ socios = [], filters = [] }) => (
  <Document title="Socios · eHuertos" author="Asociación Huertos La Salud – Bellavista">
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Header title="Socios" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <FilterChips filters={filters} />
        <Text style={[styles.chipsLabel, { marginTop: 3 }]}>{socios.length} socios</Text>
      </View>
      <Table columns={COLUMNS} rows={socios} emptyText="No hay socios con estos filtros." />
      <Footer />
    </Page>
  </Document>
);
