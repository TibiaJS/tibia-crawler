'use strict';
var assert = require('assert');
var crawler = require('../');

describe('tibia-crawler', function() {

    //this.timeout(6000); // 4sec for timeout, but world page is too long)
    it('parse exists character test', function(done) {
        process.nextTick(function() {
            crawler.character('Serphir', function(player) {
                assert.equal(player.character.name, 'Serphir');
                assert.equal(player.character.level, 36);
                assert.equal(player.character.vocation, 'Knight');
                assert.equal(player.character.world, 'Luminera');

                assert.equal(player.deaths.length, 0);
                assert.equal(player.characters.length, 0);

                done();
            });
        });
    });

    it('parse non-exists character test', function(done) {
        process.nextTick(function() {
            crawler.character('Sexrphir', function(player) {

                assert.equal(player, undefined);

                done();
            });
        });
    });

    it('parse exists world test', function(done) {
        process.nextTick(function() {
            crawler.world('Luminera', function(world) {
                world = world.world;

                assert.equal(world.online, true);
                assert.equal(world.pvpType, 'Optional PvP');
                assert.equal(world.creationDate, '07/05');

                done();
            });
        });
    });


    it('parse non-exists world test', function(done) {
        //this.timeout(4000); // 4sec for timeout, but world page is too long)
        process.nextTick(function() {
            crawler.world('Luminerx', function(world) {

                assert.equal(world, undefined);

                done();
            });
        });
    });


    it('parse world list test', function(done) {
        //this.timeout(4000); // 4sec for timeout, but world page is too long)
        process.nextTick(function() {
            crawler.worlds(function(worlds) {

                assert.equal(worlds.worlds.length, 61);

                done();
            });
        });
    });


    it('parse spell list test', function(done) {
        //this.timeout(4000);
        process.nextTick(function() {
            crawler.spells(function(spells) {

                assert.equal(spells.spells.length, 132);

                done();
            });
        });
    });

});
