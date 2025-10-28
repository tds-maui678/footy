"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const per90_1 = require("../src/utils/per90");
(0, vitest_1.describe)("per90", () => {
    (0, vitest_1.it)("computes", () => {
        (0, vitest_1.expect)((0, per90_1.per90)(10, 1800)).toBeCloseTo(0.5);
    });
});
//# sourceMappingURL=utils.test.js.map