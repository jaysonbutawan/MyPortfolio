export interface SkillMeta {
  iconClass: string;
  color: string;
  category: 'language' | 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'mobile' | 'tool' | 'design' | 'architecture';
}

export const SKILL_MAP: Record<string, SkillMeta> = {

  // ─────────────────────────────────────────────
  // LANGUAGES
  // ─────────────────────────────────────────────
  'JavaScript':    { iconClass: 'devicon-javascript-plain',        color: '#f0db4f', category: 'language' },
  'TypeScript':    { iconClass: 'devicon-typescript-plain',        color: '#007acc', category: 'language' },
  'Python':        { iconClass: 'devicon-python-plain',            color: '#3572A5', category: 'language' },
  'Java':          { iconClass: 'devicon-java-plain',              color: '#007396', category: 'language' },
  'Kotlin':        { iconClass: 'devicon-kotlin-plain',            color: '#7f52ff', category: 'language' },
  'PHP':           { iconClass: 'devicon-php-plain',               color: '#777bb3', category: 'language' },
  'C':             { iconClass: 'devicon-c-plain',                 color: '#555555', category: 'language' },
  'C++':           { iconClass: 'devicon-cplusplus-plain',         color: '#f34b7d', category: 'language' },
  'C#':            { iconClass: 'devicon-csharp-plain',            color: '#178600', category: 'language' },
  'Ruby':          { iconClass: 'devicon-ruby-plain',              color: '#701516', category: 'language' },
  'Go':            { iconClass: 'devicon-go-plain',                color: '#00ADD8', category: 'language' },
  'Rust':          { iconClass: 'devicon-rust-plain',              color: '#dea584', category: 'language' },
  'Swift':         { iconClass: 'devicon-swift-plain',             color: '#F05138', category: 'language' },
  'Dart':          { iconClass: 'devicon-dart-plain',              color: '#00B4AB', category: 'language' },
  'Scala':         { iconClass: 'devicon-scala-plain',             color: '#c22d40', category: 'language' },
  'R':             { iconClass: 'devicon-r-plain',                 color: '#198CE7', category: 'language' },
  'Perl':          { iconClass: 'devicon-perl-plain',              color: '#0298c3', category: 'language' },
  'Lua':           { iconClass: 'devicon-lua-plain',               color: '#000080', category: 'language' },
  'Haskell':       { iconClass: 'devicon-haskell-plain',           color: '#5e5086', category: 'language' },
  'Elixir':        { iconClass: 'devicon-elixir-plain',            color: '#6e4a7e', category: 'language' },
  'Erlang':        { iconClass: 'devicon-erlang-plain',            color: '#B83998', category: 'language' },
  'Clojure':       { iconClass: 'devicon-clojure-plain',           color: '#5881d8', category: 'language' },
  'MATLAB':        { iconClass: 'devicon-matlab-plain',            color: '#bb92ac', category: 'language' },
  'Groovy':        { iconClass: 'devicon-groovy-plain',            color: '#4298b8', category: 'language' },
  'ObjectiveC':    { iconClass: 'devicon-objectivec-plain',        color: '#438eff', category: 'language' },
  'CoffeeScript':  { iconClass: 'devicon-coffeescript-plain',      color: '#244776', category: 'language' },
  'HTML':          { iconClass: 'devicon-html5-plain',             color: '#e34c26', category: 'language' },
  'CSS':           { iconClass: 'devicon-css3-plain',              color: '#1572b6', category: 'language' },
  'Sass':          { iconClass: 'devicon-sass-plain',              color: '#cc6699', category: 'language' },
  'Less':          { iconClass: 'devicon-less-plain-wordmark',     color: '#1d365d', category: 'language' },
  'Bash':          { iconClass: 'devicon-bash-plain',              color: '#4EAA25', category: 'language' },
  'Shell':         { iconClass: 'devicon-bash-plain',              color: '#89e051', category: 'language' },

  // ─────────────────────────────────────────────
  // FRONTEND FRAMEWORKS & LIBRARIES
  // ─────────────────────────────────────────────
  'React':         { iconClass: 'devicon-react-original',          color: '#61DBFB', category: 'frontend' },
  'Angular':       { iconClass: 'devicon-angularjs-plain',         color: '#dd0031', category: 'frontend' },
  'Vue':           { iconClass: 'devicon-vuejs-plain',             color: '#42b883', category: 'frontend' },
  'Svelte':        { iconClass: 'devicon-svelte-plain',            color: '#ff3e00', category: 'frontend' },
  'NextJS':        { iconClass: 'devicon-nextjs-plain',            color: '#000000', category: 'frontend' },
  'NuxtJS':        { iconClass: 'devicon-nuxtjs-plain',            color: '#00DC82', category: 'frontend' },
  'Remix':         { iconClass: 'devicon-remix-plain',             color: '#000000', category: 'frontend' },
  'Tailwind':      { iconClass: 'devicon-tailwindcss-original',    color: '#06b6d4', category: 'frontend' },
  'Bootstrap':     { iconClass: 'devicon-bootstrap-plain',         color: '#7952b3', category: 'frontend' },
  'jQuery':        { iconClass: 'devicon-jquery-plain',            color: '#0769ad', category: 'frontend' },
  'Redux':         { iconClass: 'devicon-redux-original',          color: '#764abc', category: 'frontend' },
  'Webpack':       { iconClass: 'devicon-webpack-plain',           color: '#1C78C0', category: 'frontend' },
  'Vite':          { iconClass: 'devicon-vitejs-plain',            color: '#646cff', category: 'frontend' },
  'Storybook':     { iconClass: 'devicon-storybook-plain',         color: '#FF4785', category: 'frontend' },
  'ThreeJS':       { iconClass: 'devicon-threejs-original',        color: '#000000', category: 'frontend' },
  'D3':            { iconClass: 'devicon-d3js-plain',              color: '#f9a03c', category: 'frontend' },
  'Ember':         { iconClass: 'devicon-ember-original-wordmark', color: '#e04e39', category: 'frontend' },
  'Backbone':      { iconClass: 'devicon-backbonejs-plain',        color: '#0071b5', category: 'frontend' },
  'MaterialUI':    { iconClass: 'devicon-materialui-plain',        color: '#0081CB', category: 'frontend' },
  'AntDesign':     { iconClass: 'devicon-antdesign-plain',         color: '#0170FE', category: 'frontend' },
  'AlpineJS':      { iconClass: 'devicon-alpinejs-plain',          color: '#8BC0D0', category: 'frontend' },
  'HTMx':          { iconClass: 'devicon-htmx-original',           color: '#3d72d7', category: 'frontend' },
  'Astro':         { iconClass: 'devicon-astro-plain',             color: '#bc52ee', category: 'frontend' },
  'Gatsby':        { iconClass: 'devicon-gatsby-plain',            color: '#663399', category: 'frontend' },

  // ─────────────────────────────────────────────
  // BACKEND FRAMEWORKS
  // ─────────────────────────────────────────────
  'Laravel':       { iconClass: 'devicon-laravel-plain',           color: '#ff2d20', category: 'backend' },
  'NodeJS':        { iconClass: 'devicon-nodejs-plain',            color: '#339933', category: 'backend' },
  'Express':       { iconClass: 'devicon-express-original',        color: '#000000', category: 'backend' },
  'NestJS':        { iconClass: 'devicon-nestjs-plain',            color: '#e0234e', category: 'backend' },
  'Django':        { iconClass: 'devicon-django-plain',            color: '#092e20', category: 'backend' },
  'Flask':         { iconClass: 'devicon-flask-original',          color: '#000000', category: 'backend' },
  'FastAPI':       { iconClass: 'devicon-fastapi-plain',           color: '#009688', category: 'backend' },
  'Rails':         { iconClass: 'devicon-rails-plain',             color: '#cc0000', category: 'backend' },
  'Spring':        { iconClass: 'devicon-spring-plain',            color: '#6db33f', category: 'backend' },
  'Symfony':       { iconClass: 'devicon-symfony-original',        color: '#000000', category: 'backend' },
  'CodeIgniter':   { iconClass: 'devicon-codeigniter-plain',       color: '#dd4814', category: 'backend' },
  'AdonisJS':      { iconClass: 'devicon-adonisjs-original',       color: '#220052', category: 'backend' },
  'Fastify':       { iconClass: 'devicon-fastify-plain',           color: '#000000', category: 'backend' },
  'Hapi':          { iconClass: 'devicon-hapi-plain',              color: '#f4c14f', category: 'backend' },
  'Gin':           { iconClass: 'devicon-gin-plain',               color: '#00ADD8', category: 'backend' },
  'Fiber':         { iconClass: 'devicon-go-plain',                color: '#00ADD8', category: 'backend' },
  'Actix':         { iconClass: 'devicon-rust-plain',              color: '#dea584', category: 'backend' },
  'Phoenix':       { iconClass: 'devicon-phoenix-plain',           color: '#fd4f00', category: 'backend' },
  'Tornado':       { iconClass: 'devicon-python-plain',            color: '#3572A5', category: 'backend' },
  'Strapi':        { iconClass: 'devicon-strapi-plain',            color: '#8C4BFF', category: 'backend' },
  'Directus':      { iconClass: 'devicon-directus-plain',          color: '#6644FF', category: 'backend' },
  'Wordpress':     { iconClass: 'devicon-wordpress-plain',         color: '#21759b', category: 'backend' },
  'Drupal':        { iconClass: 'devicon-drupal-plain',            color: '#0678be', category: 'backend' },
  'Magento':       { iconClass: 'devicon-magento-original',        color: '#f46f25', category: 'backend' },
  'Shopify':       { iconClass: 'devicon-shopify-plain',           color: '#96bf48', category: 'backend' },
  'Livewire':      { iconClass: 'devicon-livewire-original',       color: '#fb70a9', category: 'backend' },
  'Inertia':       { iconClass: 'devicon-inertiajs-original',      color: '#9553e9', category: 'backend' },

  // ─────────────────────────────────────────────
  // DATABASES
  // ─────────────────────────────────────────────
  'MySQL':         { iconClass: 'devicon-mysql-plain',             color: '#00758f', category: 'database' },
  'PostgreSQL':    { iconClass: 'devicon-postgresql-plain',        color: '#336791', category: 'database' },
  'MongoDB':       { iconClass: 'devicon-mongodb-plain',           color: '#47A248', category: 'database' },
  'Redis':         { iconClass: 'devicon-redis-plain',             color: '#DC382D', category: 'database' },
  'SQLite':        { iconClass: 'devicon-sqlite-plain',            color: '#003B57', category: 'database' },
  'MariaDB':       { iconClass: 'devicon-mariadb-plain',           color: '#c0765a', category: 'database' },
  'Oracle':        { iconClass: 'devicon-oracle-original',         color: '#F80000', category: 'database' },
  'MSSQL':         { iconClass: 'devicon-microsoftsqlserver-plain',color: '#CC2927', category: 'database' },
  'Cassandra':     { iconClass: 'devicon-cassandra-plain',         color: '#1287b1', category: 'database' },
  'CouchDB':       { iconClass: 'devicon-couchdb-plain',           color: '#e42528', category: 'database' },
  'DynamoDB':      { iconClass: 'devicon-dynamodb-plain',          color: '#4053D6', category: 'database' },
  'Firebase':      { iconClass: 'devicon-firebase-plain',          color: '#ffca28', category: 'database' },
  'Supabase':      { iconClass: 'devicon-supabase-plain',          color: '#3ECF8E', category: 'database' },
  'PlanetScale':   { iconClass: 'devicon-planetscale-plain',       color: '#000000', category: 'database' },
  'Neo4j':         { iconClass: 'devicon-neo4j-plain',             color: '#008CC1', category: 'database' },
  'InfluxDB':      { iconClass: 'devicon-influxdb-plain',          color: '#22ADF6', category: 'database' },
  'Elasticsearch': { iconClass: 'devicon-elasticsearch-plain',     color: '#005571', category: 'database' },

  // ─────────────────────────────────────────────
  // DEVOPS & CI/CD
  // ─────────────────────────────────────────────
  'Git':           { iconClass: 'devicon-git-plain',               color: '#f05033', category: 'devops' },
  'GitHub':        { iconClass: 'devicon-github-plain',            color: '#333333', category: 'devops' },
  'GitLab':        { iconClass: 'devicon-gitlab-plain',            color: '#fc6d26', category: 'devops' },
  'Bitbucket':     { iconClass: 'devicon-bitbucket-original',      color: '#0052CC', category: 'devops' },
  'Docker':        { iconClass: 'devicon-docker-plain',            color: '#2496ed', category: 'devops' },
  'Kubernetes':    { iconClass: 'devicon-kubernetes-plain',        color: '#326ce5', category: 'devops' },
  'Jenkins':       { iconClass: 'devicon-jenkins-line',            color: '#d24939', category: 'devops' },
  'CircleCI':      { iconClass: 'devicon-circleci-plain',          color: '#343434', category: 'devops' },
  'TravisCI':      { iconClass: 'devicon-travis-plain',            color: '#3EAAAF', category: 'devops' },
  'Ansible':       { iconClass: 'devicon-ansible-plain',           color: '#EE0000', category: 'devops' },
  'Terraform':     { iconClass: 'devicon-terraform-plain',         color: '#7B42BC', category: 'devops' },
  'Vagrant':       { iconClass: 'devicon-vagrant-plain',           color: '#1868F2', category: 'devops' },
  'Nginx':         { iconClass: 'devicon-nginx-original',          color: '#009639', category: 'devops' },
  'Apache':        { iconClass: 'devicon-apache-plain',            color: '#D22128', category: 'devops' },
  'Grafana':       { iconClass: 'devicon-grafana-plain',           color: '#F46800', category: 'devops' },
  'Prometheus':    { iconClass: 'devicon-prometheus-original',     color: '#E6522C', category: 'devops' },
  'Pulumi':        { iconClass: 'devicon-pulumi-plain',            color: '#8A3391', category: 'devops' },
  'ArgoCD':        { iconClass: 'devicon-argocd-plain',            color: '#EF7B4D', category: 'devops' },
  'Helm':          { iconClass: 'devicon-helm-original',           color: '#0F1689', category: 'devops' },
  'Podman':        { iconClass: 'devicon-podman-plain',            color: '#892CA0', category: 'devops' },

  // ─────────────────────────────────────────────
  // CLOUD PLATFORMS
  // ─────────────────────────────────────────────
  'AWS':           { iconClass: 'devicon-amazonwebservices-plain-wordmark', color: '#FF9900', category: 'cloud' },
  'Azure':         { iconClass: 'devicon-azure-plain',             color: '#0078d4', category: 'cloud' },
  'GCP':           { iconClass: 'devicon-googlecloud-plain',       color: '#4285F4', category: 'cloud' },
  'CloudFlare':    { iconClass: 'devicon-cloudflare-plain',        color: '#f6821f', category: 'cloud' },
  'Heroku':        { iconClass: 'devicon-heroku-plain',            color: '#430098', category: 'cloud' },
  'Vercel':        { iconClass: 'devicon-vercel-plain',            color: '#000000', category: 'cloud' },
  'Netlify':       { iconClass: 'devicon-netlify-plain',           color: '#00C7B7', category: 'cloud' },
  'DigitalOcean':  { iconClass: 'devicon-digitalocean-plain',      color: '#0080FF', category: 'cloud' },
  'Linode':        { iconClass: 'devicon-linode-plain',            color: '#00A95C', category: 'cloud' },
  'Render':        { iconClass: 'devicon-render-plain',            color: '#46E3B7', category: 'cloud' },
  'Railway':       { iconClass: 'devicon-railway-plain',           color: '#0B0D0E', category: 'cloud' },
  'Fly':           { iconClass: 'devicon-fly-plain',               color: '#7B3BE2', category: 'cloud' },
  'Openstack':     { iconClass: 'devicon-openstack-plain',         color: '#ED1944', category: 'cloud' },
  'Alibaba':       { iconClass: 'devicon-alibaba-plain',           color: '#FF6A00', category: 'cloud' },

  // ─────────────────────────────────────────────
  // MOBILE
  // ─────────────────────────────────────────────
  'Flutter':       { iconClass: 'devicon-flutter-plain',           color: '#54c5f8', category: 'mobile' },
  'Android':       { iconClass: 'devicon-android-plain',           color: '#3ddc84', category: 'mobile' },
  'AndroidStudio': { iconClass: 'devicon-androidstudio-plain',     color: '#3ddc84', category: 'mobile' },
  'iOS':           { iconClass: 'devicon-apple-original',          color: '#555555', category: 'mobile' },
  'Xcode':         { iconClass: 'devicon-xcode-plain',             color: '#1575F9', category: 'mobile' },
  'ReactNative':   { iconClass: 'devicon-react-original',          color: '#61DBFB', category: 'mobile' },
  'Ionic':         { iconClass: 'devicon-ionic-original',          color: '#3880FF', category: 'mobile' },
  'Capacitor':     { iconClass: 'devicon-capacitor-plain',         color: '#119EFF', category: 'mobile' },
  'Expo':          { iconClass: 'devicon-expo-original',           color: '#000020', category: 'mobile' },

  // ─────────────────────────────────────────────
  // TOOLS & IDEs
  // ─────────────────────────────────────────────
  'VSCode':        { iconClass: 'devicon-vscode-plain',            color: '#007acc', category: 'tool' },
  'IntelliJ':      { iconClass: 'devicon-intellij-plain',          color: '#FE315D', category: 'tool' },
  'WebStorm':      { iconClass: 'devicon-webstorm-plain',          color: '#00CDD7', category: 'tool' },
  'PhpStorm':      { iconClass: 'devicon-phpstorm-plain',          color: '#6B57FF', category: 'tool' },
  'PyCharm':       { iconClass: 'devicon-pycharm-plain',           color: '#21D789', category: 'tool' },
  'CLion':         { iconClass: 'devicon-clion-plain',             color: '#22D88F', category: 'tool' },
  'Rider':         { iconClass: 'devicon-rider-plain',             color: '#C90F5E', category: 'tool' },
  'GoLand':        { iconClass: 'devicon-goland-plain',            color: '#0F4FBF', category: 'tool' },
  'RubyMine':      { iconClass: 'devicon-rubymine-plain',          color: '#FE2857', category: 'tool' },
  'Vim':           { iconClass: 'devicon-vim-plain',               color: '#019733', category: 'tool' },
  'Neovim':        { iconClass: 'devicon-neovim-plain',            color: '#57A143', category: 'tool' },
  'Emacs':         { iconClass: 'devicon-emacs-original',          color: '#7F5AB6', category: 'tool' },
  'Eclipse':       { iconClass: 'devicon-eclipse-plain',           color: '#2C2255', category: 'tool' },
  'Atom':          { iconClass: 'devicon-atom-original',           color: '#66595C', category: 'tool' },
  'Sublime':       { iconClass: 'devicon-sublime-plain',           color: '#FF9800', category: 'tool' },
  'Postman':       { iconClass: 'devicon-postman-plain',           color: '#FF6C37', category: 'tool' },
  'Insomnia':      { iconClass: 'devicon-insomnia-plain',          color: '#4000BF', category: 'tool' },
  'npm':           { iconClass: 'devicon-npm-original-wordmark',   color: '#CB3837', category: 'tool' },
  'Yarn':          { iconClass: 'devicon-yarn-plain',              color: '#2C8EBB', category: 'tool' },
  'Pnpm':          { iconClass: 'devicon-pnpm-plain',              color: '#F69220', category: 'tool' },
  'Composer':      { iconClass: 'devicon-composer-plain',          color: '#885630', category: 'tool' },
  'Gradle':        { iconClass: 'devicon-gradle-plain',            color: '#02303A', category: 'tool' },
  'Maven':         { iconClass: 'devicon-maven-plain',             color: '#C71A36', category: 'tool' },
  'Babel':         { iconClass: 'devicon-babel-plain',             color: '#F9DC3E', category: 'tool' },
  'ESLint':        { iconClass: 'devicon-eslint-plain',            color: '#4B32C3', category: 'tool' },
  'Jira':          { iconClass: 'devicon-jira-plain',              color: '#0052CC', category: 'tool' },
  'Trello':        { iconClass: 'devicon-trello-plain',            color: '#0052CC', category: 'tool' },
  'Confluence':    { iconClass: 'devicon-confluence-original',     color: '#172B4D', category: 'tool' },
  'Slack':         { iconClass: 'devicon-slack-plain',             color: '#4A154B', category: 'tool' },
  'Notion':        { iconClass: 'devicon-notion-plain',            color: '#000000', category: 'tool' },
  'Linux':         { iconClass: 'devicon-linux-plain',             color: '#FCC624', category: 'tool' },
  'Ubuntu':        { iconClass: 'devicon-ubuntu-plain',            color: '#E95420', category: 'tool' },
  'Debian':        { iconClass: 'devicon-debian-plain',            color: '#A81D33', category: 'tool' },
  'Fedora':        { iconClass: 'devicon-fedora-plain',            color: '#51A2DA', category: 'tool' },
  'CentOS':        { iconClass: 'devicon-centos-plain',            color: '#262577', category: 'tool' },
  'Windows':       { iconClass: 'devicon-windows8-original',       color: '#00adef', category: 'tool' },
  'Apple':         { iconClass: 'devicon-apple-original',          color: '#555555', category: 'tool' },

  // ─────────────────────────────────────────────
  // DESIGN TOOLS
  // ─────────────────────────────────────────────
  'Figma':         { iconClass: 'devicon-figma-plain',             color: '#f24e1e', category: 'design' },
  'Sketch':        { iconClass: 'devicon-sketch-plain',            color: '#F7B500', category: 'design' },
  'Adobe XD':      { iconClass: 'devicon-xd-plain',               color: '#FF61F6', category: 'design' },
  'Photoshop':     { iconClass: 'devicon-photoshop-plain',         color: '#31A8FF', category: 'design' },
  'Illustrator':   { iconClass: 'devicon-illustrator-plain',       color: '#FF9A00', category: 'design' },
  'AfterEffects':  { iconClass: 'devicon-aftereffects-plain',      color: '#9999FF', category: 'design' },
  'Premiere':      { iconClass: 'devicon-premiere-plain',          color: '#9999FF', category: 'design' },
  'InDesign':      { iconClass: 'devicon-indesign-plain',          color: '#FF3366', category: 'design' },
  'Blender':       { iconClass: 'devicon-blender-original',        color: '#F5792A', category: 'design' },
  'Unity':         { iconClass: 'devicon-unity-original',          color: '#000000', category: 'design' },
  'Unreal':        { iconClass: 'devicon-unrealengine-original',   color: '#000000', category: 'design' },
  'Canva':         { iconClass: 'devicon-canva-original',          color: '#00C4CC', category: 'design' },
  'Inkscape':      { iconClass: 'devicon-inkscape-plain',          color: '#000000', category: 'design' },

  // ─────────────────────────────────────────────
  // ARCHITECTURE & INFRASTRUCTURE
  // ─────────────────────────────────────────────
  'GraphQL':       { iconClass: 'devicon-graphql-plain',           color: '#E10098', category: 'architecture' },
  'ApacheKafka':   { iconClass: 'devicon-apachekafka-original',    color: '#231F20', category: 'architecture' },
  'RabbitMQ':      { iconClass: 'devicon-rabbitmq-original',       color: '#FF6600', category: 'architecture' },
  'gRPC':          { iconClass: 'devicon-grpc-plain',              color: '#244c5a', category: 'architecture' },
  'Socketio':      { iconClass: 'devicon-socketio-original',       color: '#010101', category: 'architecture' },
  'HAProxy':       { iconClass: 'devicon-haproxy-original',        color: '#106DA9', category: 'architecture' },
  'Traefik':       { iconClass: 'devicon-traefikproxy-plain',      color: '#24A1C1', category: 'architecture' },
  'Istio':         { iconClass: 'devicon-istio-plain',             color: '#466BB0', category: 'architecture' },
  'OpenAPI':       { iconClass: 'devicon-openapi-plain',           color: '#6BA539', category: 'architecture' },
  'Swagger':       { iconClass: 'devicon-swagger-plain',           color: '#85EA2D', category: 'architecture' },

  // ─────────────────────────────────────────────
  // AI / ML / DATA
  // ─────────────────────────────────────────────
  'TensorFlow':    { iconClass: 'devicon-tensorflow-original',     color: '#FF6F00', category: 'architecture' },
  'PyTorch':       { iconClass: 'devicon-pytorch-original',        color: '#EE4C2C', category: 'architecture' },
  'Jupyter':       { iconClass: 'devicon-jupyter-plain',           color: '#F37626', category: 'architecture' },
  'Pandas':        { iconClass: 'devicon-pandas-plain',            color: '#150458', category: 'architecture' },
  'NumPy':         { iconClass: 'devicon-numpy-plain',             color: '#4DABCF', category: 'architecture' },
  'OpenCV':        { iconClass: 'devicon-opencv-plain',            color: '#5C3EE8', category: 'architecture' },
  'Anaconda':      { iconClass: 'devicon-anaconda-original',       color: '#44A833', category: 'architecture' },
  'Hadoop':        { iconClass: 'devicon-hadoop-plain',            color: '#66CCFF', category: 'architecture' },
  'Spark':         { iconClass: 'devicon-apachespark-original',    color: '#E25A1C', category: 'architecture' },
};

// One shared percent for all skills
export const SKILL_PERCENT = 85;

// Helper: get all unique categories
export const SKILL_CATEGORIES = [
  'language', 'frontend', 'backend', 'database',
  'devops', 'cloud', 'mobile', 'tool', 'design', 'architecture'
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number];
