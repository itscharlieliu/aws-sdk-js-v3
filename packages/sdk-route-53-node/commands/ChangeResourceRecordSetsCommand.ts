import * as __aws_middleware_stack from '@aws/middleware-stack';
import * as __aws_route53_id_normalizer_middleware from '@aws/route53-id-normalizer-middleware';
import * as __aws_types from '@aws/types';
import * as _stream from 'stream';
import {ChangeResourceRecordSets} from '../model/ChangeResourceRecordSets';
import {InputTypesUnion} from '../types/InputTypesUnion';
import {OutputTypesUnion} from '../types/OutputTypesUnion';
import {ChangeResourceRecordSetsInput} from '../types/ChangeResourceRecordSetsInput';
import {ChangeResourceRecordSetsOutput} from '../types/ChangeResourceRecordSetsOutput';
import {Route53ResolvedConfiguration} from '../Route53Configuration';

export class ChangeResourceRecordSetsCommand implements __aws_types.Command<
    InputTypesUnion,
    ChangeResourceRecordSetsInput,
    OutputTypesUnion,
    ChangeResourceRecordSetsOutput,
    Route53ResolvedConfiguration,
    _stream.Readable
> {
    readonly middlewareStack = new __aws_middleware_stack.MiddlewareStack<
        ChangeResourceRecordSetsInput,
        ChangeResourceRecordSetsOutput,
        _stream.Readable
    >();

    constructor(readonly input: ChangeResourceRecordSetsInput) {}

    resolveMiddleware(
        clientStack: __aws_middleware_stack.MiddlewareStack<InputTypesUnion, OutputTypesUnion, _stream.Readable>,
        configuration: Route53ResolvedConfiguration
    ): __aws_types.Handler<ChangeResourceRecordSetsInput, ChangeResourceRecordSetsOutput> {
        const {handler} = configuration;
        const stack = clientStack.concat(this.middlewareStack);

        const handlerExecutionContext: __aws_types.HandlerExecutionContext = {
            logger: {} as any,
            model: ChangeResourceRecordSets
        };
        stack.add(
            __aws_route53_id_normalizer_middleware.idNormalizerMiddleware,
            {
                step: 'initialize',
                priority: 0,
                tags: {NORMALIZE_ROUTE53_IDS: true}
            }
        );
        stack.add(
            __aws_route53_id_normalizer_middleware.changeBatchAliasTargetIdNormalizerMiddleware,
            {
                step: 'initialize',
                priority: 0,
                tags: {NORMALIZE_ROUTE53_IDS: true}
            }
        );
        return stack.resolve(
            handler<ChangeResourceRecordSetsInput, ChangeResourceRecordSetsOutput>(handlerExecutionContext),
            handlerExecutionContext
        );
    }
}