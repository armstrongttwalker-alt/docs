const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'https://flagcicd.flagos.net';
const OUTPUT_DIR = 'E:\\BAAI\\github\\docs\\docs\\flagcicd_zh\\static';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('='.repeat(60));
  console.log('FlagCICD Screenshot Capture Tool');
  console.log('='.repeat(60));
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  console.log(`Target URL: ${BASE_URL}\n`);

  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'zh-CN'
  });

  const page = await context.newPage();

  // Navigate to the site
  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await sleep(2000);

  // Check if login is needed
  const currentUrl = page.url();
  if (currentUrl.includes('login') || await page.locator('text=登录').count() > 0) {
    console.log('\n' + '!'.repeat(60));
    console.log('Please LOGIN in the browser window.');
    console.log('After login, wait for the main page to load.');
    console.log('Then press ENTER here to continue...');
    console.log('!'.repeat(60) + '\n');

    // Wait for user to press enter
    process.stdin.once('data', () => {
      console.log('Continuing after login...\n');
    });
    await new Promise(resolve => process.stdin.once('data', resolve));
    await sleep(2000);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Starting automated screenshot capture...');
  console.log('='.repeat(60) + '\n');

  try {
    // 1. My Repository (01)
    console.log('[1/17] Capturing: 01-my-repository.png');
    try {
      await page.click('text=我的仓库').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '01-my-repository.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 2. Register GitLink dialog (02)
    console.log('[2/17] Capturing: 02-register-repository-gitlink.png');
    try {
      await page.click('button:has-text("注册仓库")').catch(() => {});
      await sleep(500);
      await page.click('text=GitLink, [value="gitlink"]').catch(() => {});
      await sleep(1000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '02-register-repository-gitlink.png') });
      console.log('  ✓ Saved');
      await page.keyboard.press('Escape');
      await sleep(500);
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 3. Register GitHub dialog (03)
    console.log('[3/17] Capturing: 03-register-repository-github.png');
    try {
      await page.click('button:has-text("注册仓库")').catch(() => {});
      await sleep(500);
      await page.click('text=GitHub, [value="github"]').catch(() => {});
      await sleep(1000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '03-register-repository-github.png') });
      console.log('  ✓ Saved');
      await page.keyboard.press('Escape');
      await sleep(500);
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 4. Repository Square (04)
    console.log('[4/17] Capturing: 04-repository-square-list.png');
    try {
      await page.click('text=仓库广场').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '04-repository-square-list.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 5-12. Repository Detail pages
    console.log('[5/17] Capturing: 05-repository-detail-workflow.png');
    try {
      // Click first repository card
      await page.click('[role="row"]:first-child, .repository-card:first-child, tr:first-child td:first-child a').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '05-repository-detail-workflow.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // Quality tab (06)
    console.log('[6/17] Capturing: 06-repository-quality.png');
    try {
      await page.click('[role="tab"]:has-text("质量"), button:has-text("质量")').catch(() => {});
      await sleep(1500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '06-repository-quality.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // Pipeline Efficiency tab (07)
    console.log('[7/17] Capturing: 07-pipeline-efficiency.png');
    try {
      await page.click('[role="tab"]:has-text("效率"), button:has-text("效率")').catch(() => {});
      await sleep(1500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '07-pipeline-efficiency.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // Benchmark tab (08)
    console.log('[8/17] Capturing: 08-benchmark-comparison.png');
    try {
      await page.click('[role="tab"]:has-text("Benchmark"), button:has-text("Benchmark")').catch(() => {});
      await sleep(1500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '08-benchmark-comparison.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // Artifacts tab (09)
    console.log('[9/17] Capturing: 09-artifacts-container.png');
    try {
      await page.click('[role="tab"]:has-text("制品"), button:has-text("制品")').catch(() => {});
      await sleep(1500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '09-artifacts-container.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // Settings tab (10)
    console.log('[10/17] Capturing: 11-settings-runner.png');
    try {
      await page.click('[role="tab"]:has-text("设置"), button:has-text("设置")').catch(() => {});
      await sleep(1500);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '11-settings-runner.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // Create Runner dialog (11)
    console.log('[11/17] Capturing: 12-create-runner.png');
    try {
      await page.click('button:has-text("创建")').catch(() => {});
      await sleep(1000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '12-create-runner.png') });
      console.log('  ✓ Saved');
      await page.keyboard.press('Escape');
      await sleep(500);
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 10. Python packages (12)
    console.log('[12/17] Capturing: 10-artifacts-python.png');
    try {
      await page.click('text=制品管理').catch(() => {});
      await sleep(500);
      await page.click('text=Python包, text=Python').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '10-artifacts-python.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 14. Artifact Images (13)
    console.log('[13/17] Capturing: 14-artifact-images.png');
    try {
      await page.click('text=制品管理').catch(() => {});
      await sleep(500);
      await page.click('text=容器镜像, text=镜像').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '14-artifact-images.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 13. Resource Specs (14)
    console.log('[14/17] Capturing: 13-resource-specs.png');
    try {
      await page.click('text=资源规格').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '13-resource-specs.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 15. Test Cases (15)
    console.log('[15/17] Capturing: 15-test-cases.png');
    try {
      await page.click('text=测试用例').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '15-test-cases.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 16. User Management (16)
    console.log('[16/17] Capturing: 16-user-manage.png');
    try {
      await page.click('text=管理端').catch(() => {});
      await sleep(500);
      await page.click('text=用户管理').catch(() => {});
      await sleep(2000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '16-user-manage.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    // 17. User Edit dialog (17)
    console.log('[17/17] Capturing: 17-user-edit-dialog.png');
    try {
      await page.click('[role="row"]:first-child button:has-text("编辑"), [role="row"]:first-child [data-action="edit"], [role="row"]:first-child button').catch(() => {});
      await sleep(1000);
      await page.screenshot({ path: path.join(OUTPUT_DIR, '17-user-edit-dialog.png') });
      console.log('  ✓ Saved');
    } catch (e) { console.log('  ✗ Error:', e.message); }

    console.log('\n' + '='.repeat(60));
    console.log('Screenshot capture complete!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('Error during capture:', error);
  }

  console.log('\nPress ENTER to close browser...');
  await new Promise(resolve => process.stdin.once('data', resolve));
  await browser.close();
}

main().catch(console.error);
