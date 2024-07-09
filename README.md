# Amazon Automation Testing

This project contains automated tests for the Amazon website using Playwright with TypeScript.

## Prerequisites

Before running the tests, make sure you have the following installed:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Setup

1. Clone this repository: ``` git clone https://github.com/priyankvadaliya/amazon-automation.git```

2. Install dependencies:

```
npm install

```

3. Set up environment variables:
Create a `.env` file in the root directory of the project and add the following:

```
AMAZON_MOBILE=your_amazon_mobile_number
AMAZON_PASSWORD=your_amazon_password
USERNAME=your_amazon_username
```

## Running the Tests

To run all tests:

```
npx playwright test
```

To run a specific test file:
```
npx playwright test tests/product-details.spec.ts
```

## Project Structure

- `pages/`: Contains Page Object Model classes for different pages of the Amazon website.
- `tests/`: Contains test files.
- `playwright.config.ts`: Playwright configuration file.

## Key Features

- Login to Amazon
- Search for products
- Validate product details
- Add products to cart
- Verify cart contents
- Apply filters to search results



