import respond from '../utils/respond';

const paginate = (model) => {
        return async (req, res, next) => {
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);

                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;

                const results: any = {};

                if (endIndex < await model.countDocuments().exec()) {
                        results.next = {
                                page: page + 1,
                                limit: limit,
                        };
                }

                if (startIndex > 0) {
                        results.previous = {
                                page: page - 1,
                                limit: limit,
                        };
                }

                try {
                        results.results = await model.find().skip(startIndex).limit(limit).exec();
                        res.paginatedResults = results;
                        next();
                } catch (e: any) {
                        res.status(500).json({ message: e.message });
                }
        };
};


export const useSanitizeMany = async (req, res, next) => {
        // sort=asc & limit = 10 & extended=true & skip = 2
        try {
                const createdAt = req.query.sort == 'asc' ? 1 : -1
                const limit = parseInt(req.query.limit) || 10
                const extended = req.query.extended === 'true' ? true : false
                const skip = parseInt(req.query.skip) || undefined

                const query = { createdAt, limit, extended, skip }
                req.$query = query

                next()
        } catch (e) {
                // console.log('sanitization.middleware', e)
                respond(res, 400, 'your query string must be badly malformatted')
        }
}

