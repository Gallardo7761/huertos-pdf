import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Header, Footer, styles, formatCurrency, formatDateTime, COLORS } from './layout';

const local = StyleSheet.create({
  kpis: {
    flexDirection: 'row',
    marginBottom: 16
  },
  kpi: {
    flexGrow: 1,
    flexBasis: 0,
    padding: 12,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cream
  },
  kpiLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.muted,
    marginBottom: 3
  },
  kpiValue: {
    fontFamily: 'Bricolage Grotesque',
    fontWeight: 700,
    fontSize: 18
  },
  accounts: {
    flexDirection: 'row'
  },
  account: {
    flexGrow: 1,
    flexBasis: 0,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden'
  },
  accountHead: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: COLORS.creamDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    fontFamily: 'Bricolage Grotesque',
    fontWeight: 700,
    fontSize: 14
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cream
  },
  lineLabel: {
    color: COLORS.muted
  },
  lineValue: {
    fontWeight: 600
  },
  final: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.cream
  },
  finalValue: {
    fontFamily: 'Bricolage Grotesque',
    fontWeight: 700,
    fontSize: 16
  },
  updated: {
    marginTop: 14,
    fontSize: 8.5,
    color: COLORS.muted
  }
});

const Account = ({ title, initial, incomes, expenses, last = false }) => (
  <View style={[local.account, last && { marginRight: 0 }]}>
    <Text style={local.accountHead}>{title}</Text>
    <View style={local.line}>
      <Text style={local.lineLabel}>Saldo inicial</Text>
      <Text style={local.lineValue}>{formatCurrency(initial)}</Text>
    </View>
    <View style={local.line}>
      <Text style={local.lineLabel}>Ingresos</Text>
      <Text style={[local.lineValue, { color: COLORS.primary }]}>+{formatCurrency(incomes)}</Text>
    </View>
    <View style={local.line}>
      <Text style={local.lineLabel}>Gastos</Text>
      <Text style={[local.lineValue, { color: COLORS.danger }]}>−{formatCurrency(expenses)}</Text>
    </View>
    <View style={local.final}>
      <Text style={{ fontWeight: 600 }}>Saldo final</Text>
      <Text style={local.finalValue}>{formatCurrency(initial + incomes - expenses)}</Text>
    </View>
  </View>
);

export const BalancePDF = ({ balance, year }) => {
  const {
    initialBank,
    initialCash,
    totalBankExpenses,
    totalCashExpenses,
    totalBankIncomes,
    totalCashIncomes,
    createdAt
  } = balance;

  const finalBank = initialBank + totalBankIncomes - totalBankExpenses;
  const finalCash = initialCash + totalCashIncomes - totalCashExpenses;

  return (
    <Document title="Balance · eHuertos" author="Asociación Huertos La Salud – Bellavista">
      <Page size="A4" style={styles.page}>
        <Header title={year ? `Balance ${year}` : 'Balance'} />

        <View style={local.kpis}>
          <View style={[local.kpi, { backgroundColor: COLORS.primary, borderColor: COLORS.primary }]}>
            <Text style={[local.kpiLabel, { color: COLORS.primarySoft }]}>Saldo total</Text>
            <Text style={[local.kpiValue, { color: '#FFFFFF' }]}>{formatCurrency(finalBank + finalCash)}</Text>
          </View>
          <View style={local.kpi}>
            <Text style={local.kpiLabel}>Ingresos</Text>
            <Text style={[local.kpiValue, { color: COLORS.primary }]}>{formatCurrency(totalBankIncomes + totalCashIncomes)}</Text>
          </View>
          <View style={[local.kpi, { marginRight: 0 }]}>
            <Text style={local.kpiLabel}>Gastos</Text>
            <Text style={[local.kpiValue, { color: COLORS.danger }]}>{formatCurrency(totalBankExpenses + totalCashExpenses)}</Text>
          </View>
        </View>

        <View style={local.accounts}>
          <Account title="Banco" initial={initialBank} incomes={totalBankIncomes} expenses={totalBankExpenses} />
          <Account title="Caja" initial={initialCash} incomes={totalCashIncomes} expenses={totalCashExpenses} last />
        </View>

        {createdAt && <Text style={local.updated}>Última actualización: {formatDateTime(new Date(createdAt))}</Text>}
        <Footer />
      </Page>
    </Document>
  );
};
