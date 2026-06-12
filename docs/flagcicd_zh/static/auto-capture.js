const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'https://flagcicd.flagos.net';
const OUTPUT_DIR = __dirname;

// Wait helper
const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('\n' + '='.repeat(70));
  console.log('  FlagCICD 自动截图工具');
  console.log('='.repeat(70) + '\n');

  console.log('启动浏览器（headless: false）...');
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    locale: 'zh-CN'
  });

  console.log(`导航到 ${BASE_URL}...\n`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await wait(3000);

  // Try to detect login state
  let needLogin = false;
  try {
    const loginBtn = await page.$('text=登录');
    if (loginBtn) needLogin = true;
  } catch {}

  if (needLogin) {
    console.log('检测到需要登录。');
    console.log('请在浏览器中完成登录...');
    console.log('登录成功后，此脚本将等待 60 秒后自动开始截图...\n');

    // Wait 60 seconds for login
    for (let i = 60; i > 0; i--) {
      process.stdout.write(`\r等待登录... ${i} 秒后开始截图   `);
      await wait(1000);

      // Check if logged in
      try {
        const myRepo = await page.$('text=我的仓库');
        if (myRepo) {
          console.log('\n检测到登录成功！\n');
          break;
        }
      } catch {}
    }
  }

  console.log('开始自动截图...\n');

  const screenshots = [
    {
      file: '01-my-repository.png',
      action: async () => {
        await page.click('text=我的仓库').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '02-register-repository-gitlink.png',
      action: async () => {
        await page.click('button:has-text("注册仓库")').catch(() => {});
        await wait(500);
        await page.click('[value="gitlink"], text=GitLink').catch(() => {});
        await wait(1000);
      }
    },
    {
      file: '03-register-repository-github.png',
      action: async () => {
        await page.keyboard.press('Escape').catch(() => {});
        await wait(300);
        await page.click('button:has-text("注册仓库")').catch(() => {});
        await wait(500);
        await page.click('[value="github"], text=GitHub').catch(() => {});
        await wait(1000);
      }
    },
    {
      file: '04-repository-square-list.png',
      action: async () => {
        await page.keyboard.press('Escape').catch(() => {});
        await wait(300);
        await page.click('text=仓库广场').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '05-repository-detail-workflow.png',
      action: async () => {
        // Click first repo row
        const row = await page.$('[role="row"]:not(:first-child) a, tr:not(:first-child) td a, .repo-link');
        if (row) await row.click();
        else await page.click('[role="row"]:nth-child(2)').catch(() => {});
        await wait(3000);
      }
    },
    {
      file: '06-repository-quality.png',
      action: async () => {
        await page.click('[role="tab"]:has-text("质量"), button:has-text("质量")').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '07-pipeline-efficiency.png',
      action: async () => {
        await page.click('[role="tab"]:has-text("效率"), button:has-text("效率")').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '08-benchmark-comparison.png',
      action: async () => {
        await page.click('[role="tab"]:has-text("Benchmark"), button:has-text("Benchmark")').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '09-artifacts-container.png',
      action: async () => {
        await page.click('[role="tab"]:has-text("制品"), button:has-text("制品")').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '10-artifacts-python.png',
      action: async () => {
        await page.click('text=制品管理').catch(() => {});
        await wait(500);
        await page.click('text=Python包, text=Python').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '11-settings-runner.png',
      action: async () => {
        // Go back to repo detail
        await page.goBack().catch(() => {});
        await wait(1000);
        await page.click('[role="tab"]:has-text("设置"), button:has-text("设置")').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '12-create-runner.png',
      action: async () => {
        await page.click('button:has-text("创建"), button:has-text("新建")').catch(() => {});
        await wait(1500);
      }
    },
    {
      file: '13-resource-specs.png',
      action: async () => {
        await page.keyboard.press('Escape').catch(() => {});
        await wait(300);
        await page.click('text=资源规格').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '14-artifact-images.png',
      action: async () => {
        await page.click('text=制品管理').catch(() => {});
        await wait(500);
        await page.click('text=容器镜像, text=镜像').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '15-test-cases.png',
      action: async () => {
        await page.click('text=测试用例').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '16-user-manage.png',
      action: async () => {
        await page.click('text=管理端').catch(() => {});
        await wait(500);
        await page.click('text=用户管理').catch(() => {});
        await wait(2000);
      }
    },
    {
      file: '17-user-edit-dialog.png',
      action: async () => {
        await page.click('[role="row"]:nth-child(2) button, [role="row"]:nth-child(2) [data-action]').catch(() => {});
        await wait(1500);
      }
    },
  ];

  let success = 0;
  let failed = 0;

  for (let i = 0; i < screenshots.length; i++) {
    const shot = screenshots[i];
    console.log(`[${i + 1}/${screenshots.length}] 截取: ${shot.file}`);

    try {
      await shot.action();
      await page.screenshot({
        path: path.join(OUTPUT_DIR, shot.file),
        fullPage: false
      });
      console.log(`  ✓ 已保存`);
      success++;
    } catch (e) {
      console.log(`  ✗ 失败: ${e.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`截图完成！成功: ${success}, 失败: ${failed}`);
  console.log('='.repeat(70) + '\n');

  // Keep browser open for a moment
  await wait(3000);
  await browser.close();
}

main().catch(e => {
  console.error('\n错误:', e.message);
  process.exit(1);
});
