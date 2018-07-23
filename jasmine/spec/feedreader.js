/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Makes sure that the allFeeds variable has been defined
        and that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        function iterateObjs(obj){
            it('has urls', function(){
                expect(obj.url).toBeTruthy();
            })

            it('has names', function(){
                expect(obj.name).toBeTruthy();
            })
        }

        allFeeds.forEach(function(x){
            iterateObjs(x)
        })
    });

    /*checks if menu's toggle works*/
    describe('The menu', function(){ 
        /*when page loads, the menu should be hidden*/  
        it('is hidden by default', function(){
            expect($('body').hasClass("menu-hidden")).toBe(true);          
        })

        const menuLink = document.getElementsByClassName('menu-icon-link');

        /*when menu is clicked, it should toggle*/
        it('is shown when clicked', function(){
            var spyEvent = spyOnEvent(menuLink[0], 'click')/*spyOnEvent is a jasmine-jquery event, please make sure jasmine-jquery is in your project*/
            $(menuLink[0]).click();
            expect($('body').hasClass("menu-hidden")).toBe(false) 
        })
        it('is hidden when clicked again', function(){
            var spyEvent = spyOnEvent(menuLink[0], 'click')
            $(menuLink[0]).click();
            expect($('body').hasClass("menu-hidden")).toBe(true) 
        }) 
    });

    /*checks if at least one entry is loaded*/
    describe('Initial Entries', function(){
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loads feeds', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })
    });

    /* Check if, when a new feed is loaded, the content actually changes*/
    describe('New Feed Selection', function(){
        /*Loads feed zero*/
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /*will hold first content for comparison*/
        let firstEntry;

        /*holds entries in html*/
        const arr = document.getElementsByClassName("entry");

        /*gets first value, that we get from feed zero*/
        let storeCon = function(){
            firstEntry = $(arr[0]).find('h2').text();
        }
        
        /*calls storeCon and then loads feed one*/
        beforeEach(function(done) {
            storeCon();
            loadFeed(1, done);
        });
        
        /*compares the first entry of feed one to the first entry of feed zero*/
        it('changes content', function(){
            const secondEntry = $(arr[0]).find('h2').text();
            expect(firstEntry === secondEntry).toBeFalsy();
        })

    });
}());
