import { build, emptyDir } from 'jsr:@deno/dnt@^0.41.3';
import config from './deno.json' with {type: "json"};

await emptyDir('./npm');

await build({
  outDir: './npm',
  entryPoints: [config.exports],
  shims: { deno: true },
  package: {
    name: 'supermemo',
    description:
      'A JavaScript/TypeScript implementation of the SuperMemo 2 (SM2) algorithm for spaced based repetition flashcards.',
    keywords: ['sm2', 'supermemo', 'flashcards', 'supermemo-2', 'spaced-repetition', 'javascript', 'typescript'],
    version: config.version,
    license: config.license,
    repository: {
      type: 'git',
      url: 'https://github.com/VienDinhCom/supermemo',
    },
    bugs: {
      url: 'https://github.com/VienDinhCom/supermemo/issues',
    },
    homepage: 'https://github.com/VienDinhCom/supermemo#readme',
  },
  postBuild() {
    Deno.copyFileSync('LICENSE', 'npm/LICENSE');
    Deno.copyFileSync('README.md', 'npm/README.md');
  },
});