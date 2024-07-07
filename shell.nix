with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "ng";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    nodejs_18
    yarn
    nodePackages."@angular/cli"
    git
  ];
}