const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'https://flagcicd.flagos.net';
const OUTPUT_DIR = 'E:\\BAAI\\github\\docs\\docs\\flagcicd_zh\\static';

// Screenshot definitions based on existing files
const screenshots = [
  { name: '01-my-repository.png', path: '/', desc: 'My Repository page' },
  { name: '02-register-repository-gitlink.png', path: '/', action: 'clickRegisterGitlink', desc: 'Register GitLink dialog' },
  { name: '03-register-repository-github.png', path: '/', action: 'clickRegisterGithub', desc: 'Register GitHub dialog' },
  { name: '04-repository-square-list.png', path: '/repository-square', desc: 'Repository Square' },
  { name: '05-repository-detail-workflow.png', path: '/repository-detail', desc: 'Repository Detail - Workflow' },
  { name: '06-repository-quality.png', path: '/repository-detail', tab: 'quality', desc: 'Repository Quality' },
  { name: '07-pipeline-efficiency.png', path: '/repository-detail', tab: 'efficiency', desc: 'Pipeline Efficiency' },
  { name: '08-benchmark-comparison.png', path: '/repository-detail', tab: 'benchmark', desc: 'Benchmark Comparison' },
  { name: '09-artifacts-container.png', path: '/repository-detail', tab: 'artifacts', desc: 'Artifacts - Container' },
  { name: '10-artifacts-python.png', path: '/artifacts/python', desc: 'Python packages' },
  { name: '11-settings-runner.png', path: '/repository-detail', tab: 'settings', desc: 'Settings - Runner' },
  { name: '12-create-runner.png', path: '/repository-detail', tab: 'settings', action: 'clickCreateRunner', desc: 'Create Runner dialog' },
  { name: '13-resource-specs.png', path: '/resource-specs', desc: 'Resource Specs' },
  { name: '14-artifact-images.png', path: '/artifacts/images', desc: 'Artifact Images' },
  { name: '15-test-cases.png', path: '/test-cases', desc: 'Test Cases' },
  { name: '16-user-manage.png', path: '/admin/user-management', desc: 'User Management' },
  { name: '17-user-edit-dialog.png', path: '/admin/user-management', action: 'clickEditUser', desc: 'User Edit dialog' },
];

async function takeScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for user to login if needed
  console.log('Waiting for page to load...');
  await page.waitForTimeout(5000);

  // Check if we need to wait for login
  const currentUrl = page.url();
  if (currentUrl.includes('login') || !currentUrl.includes(BASE_URL.replace('https://', ''))) {
    console.log('Please login in the browser window...');
    await page.waitForURL('**/flagcicd.flagos.net/**', { timeout: 120000 });
  }

  console.log('Starting screenshot capture...');

  for (const shot of screenshots) {
    console.log(`Capturing: ${shot.name} - ${shot.desc}`);
    try {
      // Navigate to the page
      if (shot.path !== '/') {
        await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      }

      // Handle tab switching
      if (shot.tab) {
        const tabSelector = `[data-tab="${shot.tab}"], button:has-text("${shot.tab}"), [role="tab"]:has-text("${shot.tab}")`;
        await page.click(tabSelector).catch(() => {});
        await page.waitForTimeout(1000);
      }

      // Handle actions
      if (shot.action === 'clickRegisterGitlink') {
        await page.click('button:has-text("注册仓库")').catch(() => {});
        await page.waitForTimeout(500);
        await page.click('text=GitLink').catch(() => {});
        await page.waitForTimeout(1000);
      } else if (shot.action === 'clickRegisterGithub') {
        await page.click('button:has-text("注册仓库")').catch(() => {});
        await page.waitForTimeout(500);
        await page.click('text=GitHub').catch(() => {});
        await page.waitForTimeout(1000);
      } else if (shot.action === 'clickCreateRunner') {
        await page.click('button:has-text("创建")').catch(() => {});
        await page.waitForTimeout(1000);
      } else if (shot.action === 'clickEditUser') {
        await page.click('[role="row"]:first-child button:has-text("编辑"), [role="row"]:first-child [data-action="edit"]').catch(() => {});
        await page.waitForTimeout(1000);
      }

      // Take screenshot
      await page.screenshot({
        path: path.join(OUTPUT_DIR, shot.name),
        fullPage: false
      });
      console.log(`  Saved: ${shot.name}`);
    } catch (error) {
      console.error(`  Error capturing ${shot.name}: ${error.message}`);
    }
  }

  console.log('All screenshots captured!');
  await browser.close();
}

takeScreenshots().catch(console.error);
