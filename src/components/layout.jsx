import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import path from 'path';

const fontPath = (file) => path.resolve(__dirname, '../../fonts', file);

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: fontPath('OpenSans-400.woff'), fontWeight: 400 },
    { src: fontPath('OpenSans-600.woff'), fontWeight: 600 },
    { src: fontPath('OpenSans-700.woff'), fontWeight: 700 }
  ]
});

Font.register({
  family: 'Bricolage Grotesque',
  fonts: [
    { src: fontPath('BricolageGrotesque-600.woff'), fontWeight: 600 },
    { src: fontPath('BricolageGrotesque-700.woff'), fontWeight: 700 }
  ]
});

Font.registerHyphenationCallback((word) => [word]);

export const COLORS = {
  text: '#1F2B21',
  muted: '#4F5D4E',
  subtle: '#616C5F',
  primary: '#2A7230',
  primarySoft: '#E2EED8',
  primarySoftText: '#1D5C22',
  cream: '#F2EDE3',
  creamDark: '#ECE6DA',
  border: '#DDD4C3',
  danger: '#B3261E',
  page: '#FFFFFF'
};

export const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 46,
    paddingHorizontal: 32,
    fontFamily: 'Open Sans',
    fontSize: 9.5,
    color: COLORS.text,
    backgroundColor: COLORS.page
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginRight: 14
  },
  headerText: {
    flexGrow: 1
  },
  brand: {
    fontSize: 9,
    color: COLORS.muted,
    marginBottom: 2
  },
  brandStrong: {
    fontFamily: 'Bricolage Grotesque',
    fontWeight: 700,
    color: COLORS.primary
  },
  title: {
    fontFamily: 'Bricolage Grotesque',
    fontWeight: 700,
    fontSize: 22,
    color: COLORS.text
  },
  generated: {
    fontSize: 8.5,
    color: COLORS.muted,
    textAlign: 'right'
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12
  },
  chipsLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.muted,
    marginRight: 6
  },
  chip: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 4,
    borderRadius: 10,
    backgroundColor: COLORS.primarySoft,
    color: COLORS.primarySoftText,
    fontSize: 9,
    fontWeight: 600
  },
  summary: {
    flexDirection: 'row',
    marginBottom: 14
  },
  summaryCard: {
    flexGrow: 1,
    flexBasis: 0,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cream
  },
  summaryCardMain: {
    flexGrow: 1.6,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  summaryLabel: {
    fontSize: 8.5,
    fontWeight: 600,
    color: COLORS.muted,
    marginBottom: 2
  },
  summaryValue: {
    fontFamily: 'Bricolage Grotesque',
    fontWeight: 700,
    fontSize: 15,
    color: COLORS.text
  },
  table: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: COLORS.creamDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 6,
    paddingHorizontal: 6
  },
  th: {
    paddingHorizontal: 4,
    fontSize: 8.5,
    fontWeight: 700,
    color: COLORS.muted
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5.5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream
  },
  rowAlt: {
    backgroundColor: '#FBF9F4'
  },
  td: {
    paddingHorizontal: 4,
    fontSize: 9
  },
  tdStrong: {
    fontWeight: 600
  },
  tdMuted: {
    color: COLORS.subtle
  },
  right: {
    textAlign: 'right'
  },
  empty: {
    padding: 24,
    textAlign: 'center',
    color: COLORS.muted
  },
  footer: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    fontSize: 8,
    color: COLORS.muted
  }
});

const madridDate = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Madrid' });
const madridDateTime = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid'
});
const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

export const formatDate = (iso) => (iso ? madridDate.format(new Date(iso)) : '');
export const formatDateTime = (date) => madridDateTime.format(date);
export const formatCurrency = (value) => currency.format(Number(value) || 0);

const LOWERCASE_WORDS = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e']);

export const formatName = (name = '') =>
  String(name ?? '')
    .toLocaleLowerCase('es-ES')
    .split(/(\s+|-)/)
    .map((word, i) => (i > 0 && LOWERCASE_WORDS.has(word)) ? word : word.charAt(0).toLocaleUpperCase('es-ES') + word.slice(1))
    .join('');

export const paymentLabel = (type) => (type === 0 ? 'Banco' : 'Caja');

export const Header = ({ title }) => (
  <View style={styles.header}>
    <Image src={path.resolve(__dirname, '../../images/logo.png')} style={styles.logo} />
    <View style={styles.headerText}>
      <Text style={styles.brand}>
        <Text style={styles.brandStrong}>eHuertos</Text> · Asociación Huertos La Salud – Bellavista
      </Text>
      <Text style={styles.title}>{title}</Text>
    </View>
    <Text style={styles.generated}>Generado el{'\n'}{formatDateTime(new Date())}</Text>
  </View>
);

export const FilterChips = ({ filters = [] }) => (
  <View style={styles.chips}>
    <Text style={styles.chipsLabel}>Filtros:</Text>
    {filters.length === 0
      ? <Text style={styles.chip}>Sin filtros</Text>
      : filters.map((filter) => <Text key={filter} style={styles.chip}>{filter}</Text>)}
  </View>
);

export const Summary = ({ summary, noun, showSplit = true, negative = false }) => {
  if (!summary) return null;
  const sign = negative && summary.total > 0 ? '−' : '';

  return (
    <View style={styles.summary}>
      <View style={[styles.summaryCard, styles.summaryCardMain]}>
        <Text style={[styles.summaryLabel, { color: COLORS.primarySoft }]}>Total</Text>
        <Text style={[styles.summaryValue, { color: '#FFFFFF', fontSize: 18 }]}>{sign}{formatCurrency(summary.total)}</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Número de {noun}</Text>
        <Text style={styles.summaryValue}>{summary.count}</Text>
      </View>
      {showSplit && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Banco</Text>
          <Text style={styles.summaryValue}>{formatCurrency(summary.bank)}</Text>
        </View>
      )}
      {showSplit && (
        <View style={[styles.summaryCard, { marginRight: 0 }]}>
          <Text style={styles.summaryLabel}>Caja</Text>
          <Text style={styles.summaryValue}>{formatCurrency(summary.cash)}</Text>
        </View>
      )}
    </View>
  );
};

export const Table = ({ columns, rows, emptyText }) => (
  <View style={styles.table}>
    <View style={styles.tableHead} fixed>
      {columns.map((col) => (
        <Text key={col.label} style={[styles.th, { flex: col.flex ?? 1 }, col.align === 'right' && styles.right]}>{col.label}</Text>
      ))}
    </View>
    {rows.length === 0 && <Text style={styles.empty}>{emptyText}</Text>}
    {rows.map((row, idx) => (
      <View key={idx} style={[styles.row, idx % 2 === 1 && styles.rowAlt]} wrap={false}>
        {columns.map((col) => (
          <Text key={col.label} style={[styles.td, { flex: col.flex ?? 1 }, col.align === 'right' && styles.right, col.style]}>
            {col.render(row)}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

export const Footer = () => (
  <View style={styles.footer} fixed>
    <Text>eHuertos · Asociación Huertos La Salud – Bellavista</Text>
    <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
  </View>
);
