<?php

namespace Drupal\custom_entities;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Provides a listing of Resource entities.
 */
class ResourceListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('ID');
    $header['title'] = $this->t('Title');
    $header['status'] = $this->t('Status');
    $header['author'] = $this->t('Author');
    $header['changed'] = $this->t('Updated');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /** @var \Drupal\custom_entities\Entity\ResourceInterface $entity */
    $row['id'] = $entity->id();
    $row['title'] = Link::fromTextAndUrl(
      $entity->label(),
      $entity->toUrl()
    );
    $row['status'] = $entity->isPublished() ? $this->t('Published') : $this->t('Unpublished');
    $row['author'] = $entity->getOwner()->getAccountName();
    $row['changed'] = \Drupal::service('date.formatter')->format($entity->getChangedTime(), 'short');
    return $row + parent::buildRow($entity);
  }

  /**
   * {@inheritdoc}
   */
  public function render() {
    $build = parent::render();
    $build['table']['#empty'] = $this->t('No resources available. <a href=":link">Add resource</a>.', [
      ':link' => Url::fromRoute('entity.resource.add_form')->toString(),
    ]);
    return $build;
  }
}