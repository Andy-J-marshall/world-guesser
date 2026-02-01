import { test, expect } from "@playwright/test";
import fixtures from "./fixtures";
import { CountryGuesserPage } from "./pages/countryGuesserPage";

test.describe("Country Guesser", () => {
  let countryGuesserPage: CountryGuesserPage;

  test.beforeEach(async ({ page }) => {
    countryGuesserPage = new CountryGuesserPage(page);
  });

  const countriesToTest = [
    {
      name: "DR Congo",
      flag: "https://flagcdn.com/w320/cd.png",
      population: "108,407,721",
      region: "Africa",
      subregion: "Middle Africa",
      landlockedText: "country has a coastline",
      capital: "Kinshasa",
    },
  ];

  for (const country of countriesToTest) {
    test.describe("Guessing countries", () => {
      test.beforeEach(async ({ page }) => {
        fixtures.forEach((c: any) => {
          if (c.name.common.toLowerCase() === country.name.toLowerCase()) {
            c.useThis = true;
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

      test("Visual test", async () => {
        await countryGuesserPage.visualTest();
      });

      test("Correct guess shows the success page", async () => {
        await countryGuesserPage.countrySearchBox.type(country.name);
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.successMessage).toHaveText(
          `Amazing! You got ${country.name} in one!`
        );
        await expect(countryGuesserPage.bestScoreText).toHaveText(
          `That was your best score for ${country.name}!`
        );
        await expect(countryGuesserPage.successFlag).toHaveAttribute(
          "src",
          country.flag
        );
      });

      test("Correct clues and feedback show after each unsuccessful guess", async () => {
        await expect(countryGuesserPage.populationClue).toContainText(
          country.population
        );

        // Incorrect guesses
        await countryGuesserPage.countrySearchBox.type("France");
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
          "Incorrect! That was attempt number 1/6.Your guesses so far: France"
        );
        await expect(countryGuesserPage.regionClue).toContainText(
          country.region
        );
        await countryGuesserPage.countrySearchBox.click();
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
          "Incorrect! That was attempt number 2/6.Your guesses so far: France, Afghanistan"
        );
        await expect(countryGuesserPage.landlockedClue).toContainText(
          country.landlockedText
        );
        await countryGuesserPage.countrySearchBox.type("Japan");
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
          "Incorrect! That was attempt number 3/6.Your guesses so far: France, Afghanistan, Japan"
        );
        await expect(countryGuesserPage.subregionClue).toContainText(
          country.subregion
        );
        await countryGuesserPage.countrySearchBox.type("India");
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
          "Incorrect! That was attempt number 4/6.Your guesses so far: France, Afghanistan, Japan, India"
        );
        await expect(countryGuesserPage.flagClue).toHaveAttribute(
          "src",
          country.flag
        );
        await countryGuesserPage.countrySearchBox.type("Algeria");
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.countryGuessFeedback).toHaveText(
          "Incorrect! That was attempt number 5/6.Your guesses so far: France, Afghanistan, Japan, India, Algeria"
        );
        await expect(countryGuesserPage.capitalClue).toContainText(
          country.capital
        );

        // Correct guess
        await countryGuesserPage.countrySearchBox.type(country.name);
        await countryGuesserPage.topCountryInList.click();
        await countryGuesserPage.countrySubmitButton.click();
        await expect(countryGuesserPage.successMessage).toHaveText(
          `Well done! It took you 6 attempts to get ${country.name}`
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
  }
});
