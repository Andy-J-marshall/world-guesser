import { test, expect } from "@playwright/test";
import fixtures from "../src/fixtures";

// TODO set the useThis flag during the test? and rename

test.describe("Country Guesser", () => {
  let countrySearchBox;
  let countrySubmitButton;
  let invalidGuessFeedback;
  let countryGuessFeedback;
  let topCountryInList;
  let successMessage;
  let successFlag;
  let bestScoreText;

  let populationClue;
  let regionClue;
  let subregionClue;
  let flagClue;
  let landlockedClue;
  let capitalClue;

  test.beforeEach(async ({ page }) => {
    countrySearchBox = page.locator("#country-search input:nth-of-type(1)");
    countrySubmitButton = page.locator("#guess-button");
    invalidGuessFeedback = page.locator("#invalid-guess-feedback");
    countryGuessFeedback = page.locator("#country-guess-feedback");
    successMessage = page.locator("#successful-country-game > h5");
    successFlag = page.locator("#successful-country-game > img");
    bestScoreText = page.locator(
      "#country-guesser-stats > div > p:nth-child(2)"
    );
    topCountryInList = page.locator("#country-search-typeahead-item-0");
    populationClue = page.locator("#population");
    regionClue = page.locator("#region");
    subregionClue = page.locator("#subregion");
    flagClue = page.locator("#flag");
    landlockedClue = page.locator("#landlocked");
    capitalClue = page.locator("#capital");
  });

  test.describe("Guessing countries", () => {
    const countryName = "DR Congo";

    test.beforeEach(async ({ page }) => {
      fixtures.forEach((country) => {
        if (country.name.common.toLowerCase() === countryName.toLowerCase()) {
          country.useThis = true;
        }
      });
      await page.route("https://restcountries.com/v3.1/all", (route) =>
        route.fulfill({
          status: 200,
          body: JSON.stringify(fixtures),
        })
      );
      await page.goto("/");
      await expect(page).toHaveTitle(/Fun With Countries/);
    });

    test("Correct guess shows the success page", async () => {
      await countrySearchBox.type(countryName);
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(successMessage).toHaveText(
        `Amazing! You got ${countryName} in one!`
      );
      await expect(bestScoreText).toHaveText(
        `That was your best score for ${countryName}!`
      );
      await expect(successFlag).toHaveAttribute(
        "src",
        "https://flagcdn.com/w320/cd.png"
      );
    });

    test("Correct clues and feedback show after each unsuccessful guess", async () => {
      await expect(populationClue).toContainText(`108,407,721`);

      // Incorrect guesses
      await countrySearchBox.type("France");
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 1/6.Your answers so far: France"
      );
      await expect(regionClue).toContainText(`Africa`);
      await countrySearchBox.click();
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 2/6.Your answers so far: France, Afghanistan"
      );
      await expect(landlockedClue).toContainText(`country has a coastline`);
      await countrySearchBox.type("Japan");
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 3/6.Your answers so far: France, Afghanistan, Japan"
      );
      await expect(subregionClue).toContainText(`Middle Africa`);
      await countrySearchBox.type("India");
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 4/6.Your answers so far: France, Afghanistan, Japan, India"
      );
      await expect(flagClue).toHaveAttribute(
        "src",
        "https://flagcdn.com/w320/cd.png"
      );
      await countrySearchBox.type("Algeria");
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 5/6.Your answers so far: France, Afghanistan, Japan, India, Algeria"
      );
      await expect(capitalClue).toContainText(`Kinshasa`);

      // Correct guess
      await countrySearchBox.type(countryName);
      await topCountryInList.click();
      await countrySubmitButton.click();
      await expect(successMessage).toHaveText(
        `Well done! It took you 6 attempts to get ${countryName}`
      );
    });
  });

  test.describe("Basic guess validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveTitle(/Fun With Countries/);
    });

    test("Cannot guess no country", async () => {
      await countrySubmitButton.click();
      await expect(invalidGuessFeedback).toHaveText(
        "Enter a valid country name"
      );
    });

    test("Cannot guess invalid country name", async ({ page }) => {
      await countrySearchBox.type("Invalid Country Name");
      await page.locator("h1").click();
      await countrySubmitButton.click();
      await expect(invalidGuessFeedback).toHaveText(
        "Enter a valid country name"
      );
    });
  });
});
