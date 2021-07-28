describe("Show test", function () {
    it("should be correct object format on searchShows()", async () => {
        let shows = await searchShows("try");
        console.log(shows);
        expect(Object.keys(shows[0])).toEqual([
            "id",
            "name",
            "summary",
            "image",
        ]);
    });
});
