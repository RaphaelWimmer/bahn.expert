export const imprint = {
  name: process.env.IMPRINT_NAME!,
  street: process.env.IMPRINT_STREET!,
  town: process.env.IMPRINT_TOWN!,
};

if (process.env.TEST_RUN) {
  imprint.name = "TEST RUN, shouldn't be public!";
  imprint.street = "TEST RUN, shouldn't be public!";
  imprint.town = "TEST RUN, shouldn't be public!";
}
