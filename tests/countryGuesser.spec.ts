import { test, expect } from "@playwright/test";

test.describe("Country Guesser", () => {
  let countrySearchBox;
  let countrySubmitButton;
  let invalidGuessFeedback;
  let countryGuessFeedback;
  let topCountryInList;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/world-guesser");
    await expect(page).toHaveTitle(/Fun With Countries/);

    countrySearchBox = page.locator("#country-search input:nth-of-type(1)");
    countrySubmitButton = page.locator("#guess-button");
    invalidGuessFeedback = page.locator("#invalid-guess-feedback");
    countryGuessFeedback = page.locator("#country-guess-feedback");
    topCountryInList = page.locator("#country-search-typeahead-item-0");
  });

  test.describe("Correct guess", () => {
    test.only("Correct guess shows as success", async () => {
      await countrySearchBox.click();
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText([
        "Incorrect! That was attempt number 1/6.Your answers so far: Afghanistan",
      ]);
    });
  });

  test.describe("Incorrect guesses", () => {
    test("Can guess country using the dropdown", async () => {
      await countrySearchBox.click();
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText([
        "Incorrect! That was attempt number 1/6.Your answers so far: Afghanistan",
      ]);
    });

    test("Can type in a country to make a guess", async () => {
      await countrySearchBox.type("United Kingdom");
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText([
        "Incorrect! That was attempt number 1/6.Your answers so far: United Kingdom",
      ]);
    });
  });

  test.describe("Basic guess validation", () => {
    test("Cannot guess no country", async () => {
      await countrySubmitButton.click();
      await expect(invalidGuessFeedback).toHaveText([
        "Enter a valid country name",
      ]);
    });

    test("Cannot guess invalid country name", async ({ page }) => {
      await countrySearchBox.type("Invalid Country Name");
      await page.locator("h1").click();
      await countrySubmitButton.click();
      await expect(invalidGuessFeedback).toHaveText([
        "Enter a valid country name",
      ]);
    });
  });
});
