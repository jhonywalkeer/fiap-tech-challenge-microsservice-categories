import {
  ReceiveMessageCommandOutput,
  SendMessageCommandOutput
} from '@aws-sdk/client-sqs'
import { QueueParams } from '@common/interfaces'
import { InputCategoryParamMock } from '@mocks/categories'

export const QueueUrlMock =
  'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue'

export const QueueParamsMock: QueueParams = {
  queue: QueueUrlMock,
  receipt_handle: 'receipt-handle-example',
  message_id: 'message-id-example'
}

export const ReceiveMessageOutput: ReceiveMessageCommandOutput = {
  Messages: [
    {
      MessageId: '25097f13-505f-4236-9901-f9998add2b31',
      Body: JSON.stringify({
        requestId: '25097f13-505f-4236-9901-f9998add2b31',
        type: 'test-event',
        data: { id: InputCategoryParamMock }
      })
    }
  ],
  $metadata: {}
}

export const SendMessageMock: SendMessageCommandOutput = ReceiveMessageOutput

export const ReceiveEmptyMessageOutput: ReceiveMessageCommandOutput = {
  $metadata: {}
}
