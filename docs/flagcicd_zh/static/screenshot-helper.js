const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'https://flagcicd.flagos.net';
const OUTPUT_DIR = 'E:\\BAAI\\github\\docs\\docs\\flagcicd_zh\\static';

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('\n========================================');
  console.log('Browser opened. Please login if needed.');
  console.log('After login, press Enter in this terminal to start capturing screenshots...');
  console.log('========================================\n');

  // Wait for user input
  process.stdin.setRawMode(true);
  await new Promise(resolve => {
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    });
  });

  console.log('\nStarting screenshot capture...\n');

  // Capture screenshots one by one
  const shots = [
    { name: '01-my-repository.png', url: BASE_URL, desc: 'My Repository page - Navigate to 我的仓库 in sidebar' },
    { name: '02-register-repository-gitlink.png', desc: 'Click 注册仓库, then GitLink option' },
    { name: '03-register-repository-github.png', desc: 'Click 注册仓库, then GitHub option' },
    { name: '04-repository-square-list.png', desc: 'Navigate to 仓库广场' },
    { name: '05-repository-detail-workflow.png', desc: 'Click a repository, workflow tab' },
    { name: '06-repository-quality.png', desc: 'Repository Quality tab' },
    { name: '07-pipeline-efficiency.png', desc: 'Pipeline Efficiency tab' },
    { name: '08-benchmark-comparison.png', desc: 'Benchmark Comparison tab' },
    { name: '09-artifacts-container.png', desc: 'Artifacts - Container tab' },
    { name: '10-artifacts-python.png', desc: 'Navigate to 制品管理 > Python包' },
    { name: '11-settings-runner.png', desc: 'Settings > Runner tab' },
    { name: '12-create-runner.png', desc: 'Click 创建 Runner Scale Set' },
    { name: '13-resource-specs.png', desc: 'Navigate to 资源规格' },
    { name: '14-artifact-images.png', desc: 'Navigate to 制品管理 > 容器镜像' },
    { name: '15-test-cases.png', desc: 'Navigate to 测试用例' },
    { name: '16-user-manage.png', desc: 'Navigate to 管理端 > 用户管理' },
    { name: '17-user-edit-dialog.png', desc: 'Click edit on a user row' },
  ];

  for (let i = 0; i < shots.length; i++) {
    const shot = shots[i];
    console.log(`\n[${i + 1}/${shots.length}] ${shot.name}`);
    console.log(`  Action: ${shot.desc}`);
    console.log(`  Press 's' to save screenshot, 'n' to skip, 'q' to quit`);

    const key = await new Promise(resolve => {
      process.stdin.setRawMode(true);
      process.stdin.once('data', (data) => {
        process.stdin.setRawMode(false);
        resolve(data.toString());
      });
    });

    if (key === 'q') {
      console.log('Quitting...');
      break;
    } else if (key === 'n') {
      console.log('  Skipped');
      continue;
    } else if (key === 's') {
      const screenshotPath = path.join(OUTPUT_DIR, shot.name);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  Saved: ${screenshotPath}`);
    }
  }

  console.log('\nScreenshot capture complete!');
  await browser.close();
}

main().catch(console.error);
