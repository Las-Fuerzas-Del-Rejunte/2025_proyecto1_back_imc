/* Reporter simple que imprime OK o motivo de fallo */
class FriendlyReporter {
  onRunStart() { console.log('\n🧪 Iniciando suite de tests...\n'); }
  onTestResult(_, tr) {
    for (const r of tr.testResults) {
      const name = [...r.ancestorTitles, r.title].join(' › ');
      if (r.status === 'passed') console.log(`✅ OK  ${name}`);
      else if (r.status === 'failed') {
        const msg = (r.failureMessages?.[0] || '').split('\n').slice(0, 2).join(' ');
        console.log(`❌ FAIL ${name} — ${msg}`);
      } else console.log(`⏭️  SKIP ${name}`);
    }
  }
  onRunComplete(_, res) {
    const t = ((Date.now() - res.startTime) / 1000).toFixed(2);
    console.log(`\n📊 Resumen: ${res.numPassedTests}/${res.numTotalTests} OK, ${res.numFailedTests} fallos, ${res.numPendingTests} pendientes. Tiempo: ${t}s\n`);
  }
}
module.exports = FriendlyReporter;