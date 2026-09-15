import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';

const HOST = process.env.DEPLOY_HOST ?? 'aliyun';
const REMOTE = process.env.DEPLOY_DIR ?? '/srv/blog';

const run = (cmd) => execSync(cmd, { stdio: 'inherit', shell: true });

console.log('\n▶ 1/3 构建静态站点');
run('npm run build');

console.log(`\n▶ 2/3 准备远端目录 ${HOST}:${REMOTE}`);
run(`ssh ${HOST} "mkdir -p ${REMOTE} && find ${REMOTE} -mindepth 1 -delete"`);

console.log('\n▶ 3/3 上传文件');
const items = readdirSync('dist')
  .map((f) => `"dist/${f}"`)
  .join(' ');
run(`scp -r ${items} ${HOST}:${REMOTE}/`);

console.log('\n✔ 部署完成 → http://121.41.26.131\n');
