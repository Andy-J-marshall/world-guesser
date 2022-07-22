import { test, expect } from "@playwright/test";
import fixtures from "./fixtures";
import { CountryGuesserPage } from "./pages/countryGuesserPage";

test.describe("Country Guesser", () => {
  let countryGuesserPage: CountryGuesserPage;

  test.beforeEach(async ({ page }) => {
    countryGuesserPage = new CountryGuesserPage(page);
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
      await countryGuesserPage.goto();
      await expect(page).toHaveTitle(/Fun With Countries/);
    });

    test("Correct guess shows the success page", async () => {
      await countryGuesserPage.countrySearchBox.type(countryName);
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.successMessage).toHaveText(
        `Amazing! You got ${countryName} in one!`
      );
      await expect(countryGuesserPage.bestScoreText).toHaveText(
        `That was your best score for ${countryName}!`
      );
      await expect(countryGuesserPage.successFlag).toHaveAttribute(
        "src",
        "https://flagcdn.com/w320/cd.png"
      );
    });

    test("Correct clues and feedback show after each unsuccessful guess", async () => {
      await expect(countryGuesserPage.populationClue).toContainText(
        `108,407,721`
      );

      // Incorrect guesses
      await countryGuesserPage.countrySearchBox.type("France");
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 1/6.Your answers so far: France"
      );
      await expect(countryGuesserPage.regionClue).toContainText(`Africa`);
      await countryGuesserPage.countrySearchBox.click();
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 2/6.Your answers so far: France, Afghanistan"
      );
      await expect(countryGuesserPage.landlockedClue).toContainText(
        `country has a coastline`
      );
      await countryGuesserPage.countrySearchBox.type("Japan");
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 3/6.Your answers so far: France, Afghanistan, Japan"
      );
      await expect(countryGuesserPage.subregionClue).toContainText(
        `Middle Africa`
      );
      await countryGuesserPage.countrySearchBox.type("India");
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 4/6.Your answers so far: France, Afghanistan, Japan, India"
      );
      await expect(countryGuesserPage.flagClue).toHaveAttribute(
        "src",
        "https://flagcdn.com/w320/cd.png"
      );
      await countryGuesserPage.countrySearchBox.type("Algeria");
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
        "Incorrect! That was attempt number 5/6.Your answers so far: France, Afghanistan, Japan, India, Algeria"
      );
      await expect(countryGuesserPage.capitalClue).toContainText(`Kinshasa`);

      // Correct guess
      await countryGuesserPage.countrySearchBox.type(countryName);
      await countryGuesserPage.topCountryInList.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.successMessage).toHaveText(
        `Well done! It took you 6 attempts to get ${countryName}`
      );
    });
  });

  test.describe("Basic guess validation", () => {
    test.beforeEach(async () => {
      await countryGuesserPage.goto();
      await countryGuesserPage.toHaveTitle();
    });

    test("Cannot guess no country", async () => {
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.invalidGuessFeedback).toHaveText(
        "Enter a valid country name"
      );
    });

    test("Cannot guess invalid country name", async () => {
      await countryGuesserPage.countrySearchBox.type("Invalid Country Name");
      await countryGuesserPage.header.click();
      await countryGuesserPage.countrySubmitButton.click();
      await expect(countryGuesserPage.invalidGuessFeedback).toHaveText(
        "Enter a valid country name"
      );
    });
  });
});
