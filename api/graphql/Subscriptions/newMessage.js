const messageSubscribe = (parent, args, context, info) => {
    console.log(args)
    return pubsub.asyncIterator(SUCCESS)
}

export const newMessageSubscription = {
    subscribe: messageSubscribe,
    resolve: payload => {
        console.log(payload);
        return payload;
    }

}