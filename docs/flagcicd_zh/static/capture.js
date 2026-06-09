const { chromium } = require('playwright');
const path = require('path');
const readline = require('readline');

const BASE_URL = 'https://flagcicd.flagos.net';
const OUTPUT_DIR = __dirname;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('  FlagCICD Screenshot Capture Tool');
  console.log('  重新截图工具 - 更新 Logo');
  console.log('='.repeat(70));
  console.log(`\n输出目录: ${OUTPUT_DIR}`);
  console.log(`目标网站: ${BASE_URL}\n`);

  console.log('正在启动浏览器...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    locale: 'zh-CN'
  });

  console.log(`正在导航到 ${BASE_URL}...\n`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('!'.repeat(70));
  console.log('  请在浏览器窗口中登录');
  console.log('  登录后，请在终端按 Enter 键继续...');
  console.log('!'.repeat(70) + '\n');

  await question('');

  const screenshots = [
    { file: '01-my-repository.png', desc: '我的仓库页面', nav: '我的仓库' },
    { file: '02-register-repository-gitlink.png', desc: '注册仓库 - GitLink 对话框', action: 'register-gitlink' },
    { file: '03-register-repository-github.png', desc: '注册仓库 - GitHub 对话框', action: 'register-github' },
    { file: '04-repository-square-list.png', desc: '仓库广场', nav: '仓库广场' },
    { file: '05-repository-detail-workflow.png', desc: '仓库详情 - 工作流', action: 'repo-detail' },
    { file: '06-repository-quality.png', desc: '仓库详情 - 质量', action: 'tab-质量' },
    { file: '07-pipeline-efficiency.png', desc: '仓库详情 - 效率', action: 'tab-效率' },
    { file: '08-benchmark-comparison.png', desc: '仓库详情 - Benchmark', action: 'tab-Benchmark' },
    { file: '09-artifacts-container.png', desc: '仓库详情 - 制品', action: 'tab-制品' },
    { file: '10-artifacts-python.png', desc: '制品管理 - Python包', nav: '制品管理>Python包' },
    { file: '11-settings-runner.png', desc: '仓库详情 - 设置/Runner', action: 'tab-设置' },
    { file: '12-create-runner.png', desc: '创建 Runner Scale Set 对话框', action: 'create-runner' },
    { file: '13-resource-specs.png', desc: '资源规格', nav: '资源规格' },
    { file: '14-artifact-images.png', desc: '制品管理 - 容器镜像', nav: '制品管理>容器镜像' },
    { file: '15-test-cases.png', desc: '测试用例', nav: '测试用例' },
    { file: '16-user-manage.png', desc: '管理端 - 用户管理', nav: '管理端>用户管理' },
    { file: '17-user-edit-dialog.png', desc: '用户编辑对话框', action: 'edit-user' },
  ];

  console.log('\n开始截图流程...\n');
  console.log('提示: 浏览器会自动导航，请在每次截图前确认页面正确');
  console.log('      按 Enter 保存截图，输入 s 跳过，输入 q 退出\n');

  for (let i = 0; i < screenshots.length; i++) {
    const shot = screenshots[i];
    console.log('-'.repeat(70));
    console.log(`[${i + 1}/${screenshots.length}] ${shot.file}`);
    console.log(`描述: ${shot.desc}`);

    if (shot.nav) {
      console.log(`\n请手动导航到: ${shot.nav}`);
    } else if (shot.action) {
      console.log(`\n请执行操作: ${shot.action}`);
    }

    console.log('\n按 Enter 保存截图 (s=跳过, q=退出): ');
    const answer = await question('');

    if (answer.toLowerCase() === 'q') {
      console.log('退出截图流程');
      break;
    } else if (answer.toLowerCase() === 's') {
      console.log('已跳过\n');
      continue;
    }

    try {
      const screenshotPath = path.join(OUTPUT_DIR, shot.file);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`✓ 已保存: ${shot.file}\n`);
    } catch (e) {
      console.log(`✗ 保存失败: ${e.message}\n`);
    }
  }

  console.log('='.repeat(70));
  console.log('截图完成！');
  console.log('='.repeat(70) + '\n');

  rl.close();
  await browser.close();
}

main().catch(e => {
  console.error('错误:', e);
  rl.close();
});
