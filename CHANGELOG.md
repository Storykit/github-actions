## [1.5.3](https://github.com/Storykit/github-actions/compare/v1.5.2...v1.5.3) (2021-06-01)


### Bug Fixes

* use same args for multiple inputs ([#53](https://github.com/Storykit/github-actions/issues/53)) ([0099e15](https://github.com/Storykit/github-actions/commit/0099e15f5fd78c136cc37d9c5e3ad9cc33df0a1f))

## [1.5.2](https://github.com/Storykit/github-actions/compare/v1.5.1...v1.5.2) (2021-05-31)


### Bug Fixes

* NODE_ENV as build arg for heroku docker release ([#50](https://github.com/Storykit/github-actions/issues/50)) ([6ff71a0](https://github.com/Storykit/github-actions/commit/6ff71a0a85480405261f1553c29f335a7d894948))

## [1.5.1](https://github.com/Storykit/github-actions/compare/v1.5.0...v1.5.1) (2021-05-04)


### Bug Fixes

* set HOME env variable for heroku cli ([5d76969](https://github.com/Storykit/github-actions/commit/5d76969d9abde62c0c1711367fec4e53f4a275d3))

# [1.5.0](https://github.com/Storykit/github-actions/compare/v1.4.6...v1.5.0) (2021-03-26)


### Features

* extract logic from main ([#42](https://github.com/Storykit/github-actions/issues/42)) ([3a23319](https://github.com/Storykit/github-actions/commit/3a23319d21fe82142b35040cb4ec2954748a5821))
* heroku docker release action ([#44](https://github.com/Storykit/github-actions/issues/44)) ([3bdc902](https://github.com/Storykit/github-actions/commit/3bdc902e93286b49d50458e37813cded6d6dd143))
* multiple images ([#45](https://github.com/Storykit/github-actions/issues/45)) ([1895aae](https://github.com/Storykit/github-actions/commit/1895aaee49accbf8247fbb1af5cac7f2b4110d3e))

## [1.4.6](https://github.com/Storykit/github-actions/compare/v1.4.5...v1.4.6) (2020-11-16)


### Bug Fixes

* remove newline joining since shell tries to execute commands thatt does not exist ([#40](https://github.com/Storykit/github-actions/issues/40)) ([71a8148](https://github.com/Storykit/github-actions/commit/71a8148ea4ba2a7bd16a55534376ed6a1ac47be9))

## [1.4.5](https://github.com/Storykit/github-actions/compare/v1.4.4...v1.4.5) (2020-10-02)


### Bug Fixes

* remove single quotatin marks from branches ignore ([e8e11f9](https://github.com/Storykit/github-actions/commit/e8e11f913d1d4feb92bdd6c1a2c8a543b278efe9))
* replace characters not allowed in docker tag names ([#37](https://github.com/Storykit/github-actions/issues/37)) ([d67b0b3](https://github.com/Storykit/github-actions/commit/d67b0b3ca9fcae150e554715abe3a01f9dda1268))

## [1.4.4](https://github.com/Storykit/github-actions/compare/v1.4.3...v1.4.4) (2020-08-29)


### Bug Fixes

* refactor request logic for getting tags ([4f9ac76](https://github.com/Storykit/github-actions/commit/4f9ac76651bd7ed4fb207e35cb845e864aaa8504))
* refactor variable init ([#28](https://github.com/Storykit/github-actions/issues/28)) ([736b30e](https://github.com/Storykit/github-actions/commit/736b30e8c143a0b242b0a16ba2885d2731d465a6))
* remove top line bash code ([2b52059](https://github.com/Storykit/github-actions/commit/2b52059785ada8f82559e32455c250b82ec92e3e))

## [1.4.3](https://github.com/Storykit/github-actions/compare/v1.4.2...v1.4.3) (2020-08-29)


### Bug Fixes

* add more verbose logging ([#26](https://github.com/Storykit/github-actions/issues/26)) ([198c325](https://github.com/Storykit/github-actions/commit/198c3258bfcbb7060f40c6fededebf91ea807dc6))

## [1.4.2](https://github.com/Storykit/github-actions/compare/v1.4.1...v1.4.2) (2020-08-28)


### Bug Fixes

* add v1 tag to action ([#24](https://github.com/Storykit/github-actions/issues/24)) ([fd37f56](https://github.com/Storykit/github-actions/commit/fd37f568de46391ff28ce9bf2b043e1c4058401b))
* refactor beta release action ([#20](https://github.com/Storykit/github-actions/issues/20)) ([b140c59](https://github.com/Storykit/github-actions/commit/b140c596bcf6c5cdce8aeb4544ae835d261f7b19))

## [1.4.1](https://github.com/Storykit/github-actions/compare/v1.4.0...v1.4.1) (2020-08-28)


### Bug Fixes

* remove ignore branch event' ([#15](https://github.com/Storykit/github-actions/issues/15)) ([a509510](https://github.com/Storykit/github-actions/commit/a50951042b8489f83de7ee635dfdea4a8a4415ba))

# [1.4.0](https://github.com/Storykit/github-actions/compare/v1.3.0...v1.4.0) (2020-08-28)


### Bug Fixes

* skip beta on master branch ([#13](https://github.com/Storykit/github-actions/issues/13)) ([eca9b1d](https://github.com/Storykit/github-actions/commit/eca9b1d26086dedb3ce7c2327d1a884034924226))


### Features

* add action to do prerelease for packages ([#10](https://github.com/Storykit/github-actions/issues/10)) ([0aa265b](https://github.com/Storykit/github-actions/commit/0aa265ba52b938cf90e26703a39647ca011d43b6))

# [1.3.0](https://github.com/Storykit/github-actions/compare/v1.2.0...v1.3.0) (2020-07-07)


### Features

* add option for specifying branches and tags for head tag ([#1](https://github.com/Storykit/github-actions/issues/1)) ([b4c396d](https://github.com/Storykit/github-actions/commit/b4c396d0ef40dd1f0454d52a269537d318263d36))

# [1.2.0](https://github.com/Storykit/github-actions/compare/v1.1.0...v1.2.0) (2020-07-06)


### Features

* add .releaserc.json ([d381693](https://github.com/Storykit/github-actions/commit/d3816932b61b6c429e583f5817947e28498fa4d8))
