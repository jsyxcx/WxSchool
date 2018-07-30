// BarrettMu, a class for performing Barrett modular reduction computations in
// JavaScript.
//
// Requires BigInt.js.
//
// Copyright 2004-2005 David Shapiro.
//
// You may use, re-use, abuse, copy, and modify this code to your liking, but
// please keep this header.
//
// Thanks!
// 
// Dave Shapiro
// dave@ohdave.com 

const Big = require('../../js/RSA/BigInt.js')

function BarrettMu(m)
{
  this.modulus = Big.biCopy(m);
  this.k = Big.biHighIndex(this.modulus) + 1;
  var b2k = new Big.BigInt();
	b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
  this.mu = Big.biDivide(b2k, this.modulus);
  this.bkplus1 = new Big.BigInt();
	this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
  this.modulo = BarrettMu_modulo;
	this.multiplyMod = BarrettMu_multiplyMod;
	this.powMod = BarrettMu_powMod;
}

function BarrettMu_modulo(x)
{
  var q1 = Big.biDivideByRadixPower(x, this.k - 1);
  var q2 = Big.biMultiply(q1, this.mu);
  var q3 = Big.biDivideByRadixPower(q2, this.k + 1);
  var r1 = Big.biModuloByRadixPower(x, this.k + 1);
  var r2term = Big.biMultiply(q3, this.modulus);
  var r2 = Big.biModuloByRadixPower(r2term, this.k + 1);
  var r = Big.biSubtract(r1, r2);
	if (r.isNeg) {
    r = Big.biAdd(r, this.bkplus1);
	}
  var rgtem = Big.biCompare(r, this.modulus) >= 0;
	while (rgtem) {
    r = Big.biSubtract(r, this.modulus);
    rgtem = Big.biCompare(r, this.modulus) >= 0;
	}
	return r;
}

function BarrettMu_multiplyMod(x, y)
{
	/*
	x = this.modulo(x);
	y = this.modulo(y);
	*/
  var xy = Big.biMultiply(x, y);
	return this.modulo(xy);
}

function BarrettMu_powMod(x, y)
{
  var result = new Big.BigInt();
	result.digits[0] = 1;
	var a = x;
	var k = y;
	while (true) {
		if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
    k = Big.biShiftRight(k, 1);
    if (k.digits[0] == 0 && Big.biHighIndex(k) == 0) break;
		a = this.multiplyMod(a, a);
	}
	return result;
}

module.exports = {
  BarrettMu: BarrettMu
};