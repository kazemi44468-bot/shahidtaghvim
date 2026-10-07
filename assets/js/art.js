/* تقویم شهدا — تصویرساز برداری رویدادها و اشخاص (تولید تصویر متناسب) */
(function () {
  'use strict';
  var FA = '۰۱۲۳۴۵۶۷۸۹';
  function toFa(v) { return String(v == null ? '' : v).replace(/\d/g, function (d) { return FA[+d]; }); }
  var PAL = {
    martyrdom: ['#5e1622', '#a8323f'],
    operation: ['#0d2a21', '#1f5a44'],
    war: ['#33240d', '#7a5a1e'],
    revolution: ['#4a2410', '#a85f18'],
    ceremony: ['#1b2440', '#3b5688'],
    birth: ['#0e2c40', '#26657f'],
    event: ['#2a3138', '#525f6b']
  };
  var GLYPH = {
    martyrdom: '<path d="M320 52 L340 106 L398 110 L352 148 L367 204 L320 173 L273 204 L288 148 L242 110 L300 106 Z" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.5)" stroke-width="3"/>',
    operation: '<path d="M320 50 L248 88 L248 136 C248 178 320 216 320 216 C320 216 392 178 392 136 L392 88 Z" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.5)" stroke-width="3"/>',
    war: '<path d="M252 196 L388 64 M252 64 L388 196" stroke="rgba(255,255,255,.35)" stroke-width="11" stroke-linecap="round"/>',
    revolution: '<path d="M320 52 C286 100 266 134 266 166 A54 54 0 0 0 374 166 C374 134 354 100 320 52 Z" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.5)" stroke-width="3"/>',
    ceremony: '<circle cx="320" cy="136" r="64" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/><circle cx="320" cy="136" r="40" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3"/><circle cx="320" cy="136" r="14" fill="rgba(255,255,255,.45)"/>',
    birth: '<circle cx="320" cy="136" r="62" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3"/><path d="M320 94 V136 L352 160" stroke="rgba(255,255,255,.55)" stroke-width="4" fill="none" stroke-linecap="round"/>',
    event: '<rect x="260" y="86" width="120" height="104" rx="12" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3"/><path d="M288 120 H352 M288 148 H352 M288 176 H330" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-linecap="round"/>'
  };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function eventArt(ev) {
    var t = ev.type || 'event';
    var c = PAL[t] || PAL.event;
    var glyph = GLYPH[t] || GLYPH.event;
    var year = ev.year ? toFa(ev.year) : 'مناسبت';
    var title = (ev.title || '').slice(0, 26);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" role="img" aria-label="' + esc(title) + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient>' +
      '<pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M20 4 L36 20 L20 36 L4 20 Z" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1.5"/></pattern></defs>' +
      '<rect width="640" height="220" fill="url(#g)"/><rect width="640" height="220" fill="url(#p)"/>' +
      '<circle cx="562" cy="26" r="92" fill="rgba(255,255,255,.05)"/><circle cx="78" cy="212" r="72" fill="rgba(0,0,0,.10)"/>' +
      glyph +
      '<text x="620" y="150" text-anchor="end" font-family="Vazirmatn, Tahoma, sans-serif" font-size="34" font-weight="800" fill="rgba(255,255,255,.94)" direction="rtl">' + esc(title) + '</text>' +
      '<text x="620" y="188" text-anchor="end" font-family="Vazirmatn, Tahoma, sans-serif" font-size="20" fill="rgba(255,255,255,.62)" direction="rtl">' + esc(year) + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function martyrArt(m) {
    var c = PAL.martyrdom;
    var initial = (m.name || '?').trim().charAt(0);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 533" role="img" aria-label="' + esc(m.name) + '">' +
      '<defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient>' +
      '<pattern id="mp" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M23 5 L41 23 L23 41 L5 23 Z" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1.5"/></pattern></defs>' +
      '<rect width="400" height="533" fill="url(#mg)"/><rect width="400" height="533" fill="url(#mp)"/>' +
      '<circle cx="200" cy="205" r="112" fill="rgba(255,255,255,.10)"/>' +
      '<text x="200" y="262" text-anchor="middle" font-family="Vazirmatn, Tahoma, sans-serif" font-size="150" font-weight="800" fill="rgba(255,255,255,.9)">' + esc(initial) + '</text>' +
      '<text x="200" y="416" text-anchor="middle" font-family="Vazirmatn, Tahoma, sans-serif" font-size="30" font-weight="700" fill="rgba(255,255,255,.88)" direction="rtl">' + esc(m.name) + '</text>' +
      '<text x="200" y="458" text-anchor="middle" font-family="Vazirmatn, Tahoma, sans-serif" font-size="19" fill="rgba(255,255,255,.58)" direction="rtl">' + esc((m.role || '').slice(0, 34)) + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  window.DSHArt = { event: eventArt, martyr: martyrArt };
})();
