module.exports = {
    info: () => `This is the API of a GraphQL tutorial`,
    feed: async (root, args, context) => {
        const where = args.filter ? {
            OR: [
                { description_contains: args.filter },
                { url_contains: args.filter },
            ],
        } : {};

        const links = await context.prisma.links({
            where,
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy
        });

        const count = await context.prisma
            .linksConnection({
                where,
            })
            .aggregate()
            .count();

        return { links, count };
    },
    link: (root, args, context) => context.prisma.link({ id: args.id })
};
