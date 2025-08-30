import { Template } from './flow-preview'

interface Props {
  id: number
  title: string
  code: string
  author: string
  likes: number
}

export const mockFlows: Template[] = [
  {
    id: 1,
    title: 'Node.js CI Pipeline',
    code: `name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test`,
    idAuthor: 101,
    idAction: '1', // Push
    author: 'Alice',
    likes: 42,
  },
  {
    id: 2,
    title: 'Python Lint & Test',
    code: `name: Python CI
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install flake8
      - run: flake8 .`,
    idAuthor: 102,
    idAction: '2', // Pull
    author: 'Bob',
    likes: 18,
  },
  {
    id: 3,
    title: 'Docker Build & Push',
    code: `name: Docker CI
on:
  push:
    branches: [main]
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t my-app .
      - run: docker push my-app`,
    idAuthor: 103,
    idAction: '1', // Push
    author: 'Charlie',
    likes: 27,
  },
  {
    id: 4,
    title: 'AWS S3 Deploy',
    code: `name: Deploy S3
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
      - run: aws s3 sync . s3://my-bucket`,
    idAuthor: 104,
    idAction: '3', // Full
    author: 'Diana',
    likes: 33,
  },
  {
    id: 5,
    title: 'Go Build & Test',
    code: `name: Go CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v3
        with:
          go-version: '1.18'
      - run: go build ./...
      - run: go test ./...`,
    idAuthor: 105,
    idAction: '3', // Full (or use 'All Actions' if you add it to actions)
    author: 'Eve',
    likes: 19,
  },
  {
    id: 6,
    title: 'React Build',
    code: `name: React CI
on: [push]
jobs:
  react:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run build`,
    idAuthor: 106,
    idAction: '1', // Push
    author: 'Frank',
    likes: 25,
  },
  {
    id: 7,
    title: 'Rails CI',
    code: `name: Rails CI
on: [push]
jobs:
  rails:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
      - run: bundle install
      - run: bundle exec rspec`,
    idAuthor: 107,
    idAction: '3', // Full
    author: 'Grace',
    likes: 14,
  },
  {
    id: 8,
    title: 'Java Maven Build',
    code: `name: Maven CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
      - run: mvn install`,
    idAuthor: 108,
    idAction: '3', // Full (or use 'All Actions' if you add it to actions)
    author: 'Henry',
    likes: 22,
  },
  {
    id: 9,
    title: 'Laravel CI',
    code: `name: Laravel CI
on: [push]
jobs:
  laravel:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
      - run: composer install
      - run: php artisan test`,
    idAuthor: 109,
    idAction: '2', // Pull
    author: 'Isabel',
    likes: 21,
  },
  {
    id: 10,
    title: '.NET Build & Test',
    code: `name: .NET CI
on: [push]
jobs:
  dotnet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '6.0'
      - run: dotnet build
      - run: dotnet test`,
    idAuthor: 110,
    idAction: '3', // Full (or use 'All Actions' if you add it to actions)
    author: 'Jack',
    likes: 30,
  },
]
